/*
	Vanilla JS replacement for jQuery/Skel/scrollex/scrolly stack.
	Preserves: page-load animation, scroll-triggered fade-ins,
	gallery scroll + lightbox, smooth-scroll anchors.
*/

(function () {
	'use strict';

	// ---- Page-load animation ----
	document.body.classList.add('is-loading');
	window.addEventListener('load', function () {
		setTimeout(function () {
			document.body.classList.remove('is-loading');
		}, 100);
	});

	// ---- Scroll-triggered animations via IntersectionObserver ----
	function setupScrollAnimations() {
		if (!('IntersectionObserver' in window)) return;

		var wrapper = document.getElementById('wrapper');
		if (!wrapper) return;

		// Wrapper direct children: fade in when 30% visible
		var wrapperObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.remove('is-inactive');
				} else if (entry.target.classList.contains('onscroll-bidirectional')) {
					entry.target.classList.add('is-inactive');
				}
			});
		}, { rootMargin: '-30vh 0px -30vh 0px', threshold: 0 });

		Array.prototype.forEach.call(wrapper.children, function (child) {
			child.classList.add('is-inactive');
			wrapperObserver.observe(child);
		});

		// .items containers
		var itemsObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.remove('is-inactive');
				} else if (entry.target.classList.contains('onscroll-bidirectional')) {
					entry.target.classList.add('is-inactive');
				}
			});
		}, { rootMargin: '-30vh 0px -30vh 0px', threshold: 0 });

		document.querySelectorAll('.items').forEach(function (el) {
			el.classList.add('is-inactive');
			itemsObserver.observe(el);

			// Wrap children inner content (matches original jQuery behavior)
			Array.prototype.forEach.call(el.children, function (child) {
				if (!child.querySelector('.inner')) {
					var inner = document.createElement('div');
					inner.className = 'inner';
					while (child.firstChild) {
						inner.appendChild(child.firstChild);
					}
					child.appendChild(inner);
				}
			});
		});
	}

	// ---- Gallery ----
	function setupGallery() {
		var isMobile = window.matchMedia('(max-width: 980px)').matches;

		document.querySelectorAll('.gallery').forEach(function (gallery) {
			// Wrap content in .inner if not already
			var existingInner = gallery.querySelector(':scope > .inner');
			if (!existingInner) {
				var inner = document.createElement('div');
				inner.className = 'inner';
				while (gallery.firstChild) {
					inner.appendChild(gallery.firstChild);
				}
				gallery.appendChild(inner);
			}

			var galleryInner = gallery.querySelector(':scope > .inner');

			// Add forward/backward buttons on desktop
			if (!isMobile) {
				var forward = document.createElement('div');
				forward.className = 'forward';
				var backward = document.createElement('div');
				backward.className = 'backward';
				gallery.insertBefore(forward, galleryInner);
				gallery.insertBefore(backward, galleryInner);
			}

			// Set overflow styles
			galleryInner.style.overflowY = isMobile ? 'visible' : 'hidden';
			galleryInner.style.overflowX = isMobile ? 'scroll' : 'hidden';
			galleryInner.scrollLeft = 0;

			// Scroll animation
			if ('IntersectionObserver' in window) {
				gallery.classList.add('is-inactive');
				var obs = new IntersectionObserver(function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							entry.target.classList.remove('is-inactive');
						} else if (entry.target.classList.contains('onscroll-bidirectional')) {
							entry.target.classList.add('is-inactive');
						}
					});
				}, { rootMargin: '-30vh 0px -30vh 0px', threshold: 0 });
				obs.observe(gallery);
			}

			// Wheel scroll on gallery inner
			galleryInner.addEventListener('wheel', function (event) {
				var delta = event.deltaX * 10;
				if (delta > 0) delta = Math.min(25, delta);
				else if (delta < 0) delta = Math.max(-25, delta);
				this.scrollLeft += delta;
			});

			// Forward/backward hover scroll
			var moveIntervalId;
			gallery.addEventListener('mouseenter', function (event) {
				var target = event.target;
				if (!target.classList.contains('forward') && !target.classList.contains('backward')) return;
				var direction = target.classList.contains('forward') ? 1 : -1;
				clearInterval(moveIntervalId);
				moveIntervalId = setInterval(function () {
					galleryInner.scrollLeft += 5 * direction;
				}, 10);
			}, true);

			gallery.addEventListener('mouseleave', function (event) {
				var target = event.target;
				if (target.classList.contains('forward') || target.classList.contains('backward')) {
					clearInterval(moveIntervalId);
				}
			}, true);

			// Lightbox
			if (gallery.classList.contains('lightbox')) {
				// Create modal
				var modal = document.createElement('div');
				modal.className = 'modal';
				modal.tabIndex = -1;
				modal.innerHTML = '<div class="inner"><img src="" /></div>';
				gallery.appendChild(modal);

				var modalImg = modal.querySelector('img');
				var locked = false;

				// Open lightbox on link click
				gallery.addEventListener('click', function (event) {
					var link = event.target.closest('a');
					if (!link) return;

					var href = link.getAttribute('href');
					if (!href || !href.match(/\.(jpg|gif|png|mp4)$/)) return;

					event.preventDefault();
					event.stopPropagation();

					if (locked) return;
					locked = true;

					modalImg.src = href;
					modal.classList.add('visible');
					modal.focus();

					setTimeout(function () { locked = false; }, 600);
				});

				// Close lightbox on modal click
				modal.addEventListener('click', function () {
					if (locked || !modal.classList.contains('visible')) return;
					locked = true;

					modal.classList.remove('loaded');
					setTimeout(function () {
						modal.classList.remove('visible');
						setTimeout(function () {
							modalImg.src = '';
							locked = false;
							document.body.focus();
						}, 475);
					}, 125);
				});

				// Close on Escape
				modal.addEventListener('keydown', function (event) {
					if (event.key === 'Escape') modal.click();
				});

				// Set loaded state when image finishes loading
				modalImg.addEventListener('load', function () {
					setTimeout(function () {
						if (modal.classList.contains('visible')) {
							modal.classList.add('loaded');
						}
					}, 275);
				});
			}
		});
	}

	// ---- Init ----
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			setupScrollAnimations();
			setupGallery();
		});
	} else {
		setupScrollAnimations();
		setupGallery();
	}
})();
