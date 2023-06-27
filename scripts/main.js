const types = {
	BUG: 'bug',
	DARK: 'dark',
	DRAGON: 'dragon',
	ELECTRIC: 'electric',
	FAIRY: 'fairy',
	FIRE: 'fire',
	FIGHTING: 'fighting',
	FLYING: 'flying',
	GHOST: 'ghost',
	GRASS: 'grass',
	GROUND: 'ground',
	ICE: 'ice',
	NORMAL: 'normal',
	POISON: 'poison',
	PSYCHIC: 'psychic',
	ROCK: 'rock',
	STEEL: 'steel',
	WATER: 'water',
}
Object.freeze(types);

// Elements
const $header = document.querySelector('header');
const $title = document.querySelector('h1');

// Constants
const icons = [];

// Variables
let animationFrame;
var deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
	loadPokemonIcons();
	startIcons();
});

function loadPokemonIcons() {
	if ($header) {
		// Loop over types...
		for (const [key, value] of Object.entries(types)) {
			const $iconContainer = document.createElement('div');
			const icon = {
				element: $iconContainer,
			};

			$iconContainer.classList.add('icon');
			$iconContainer.classList.add(value);
			getRandomIconPosition(icon);
			getRandomIconVelocity(icon);
			$header.appendChild($iconContainer);

			icons.push(icon);

			const $icon = document.createElement('img');
			$icon.src = `images/icons/${value}.svg`;
			$icon.alt = `${value} icon`;
			$iconContainer.appendChild($icon);
		}
		
		resolveCollisions();
	}
}

function getRandomIconPosition(icon) {
	icon.top = (Math.random() * (window.innerHeight - 100));
	icon.left = (Math.random() * (window.innerWidth - 100));
	icon.element.style.transform = `translate(${icon.left}px, ${icon.top}px)`;
}

function getRandomIconVelocity(icon) {
	let horizontalVelocity = 2 * Math.random() - 1;
	let verticalVelocity = 2 * Math.random() - 1;

	// Normalise
	const norm = Math.sqrt(horizontalVelocity**2 + verticalVelocity**2);
	horizontalVelocity /= norm;
	verticalVelocity /= norm;

	icon.horizontalVelocity = horizontalVelocity;
	icon.verticalVelocity = verticalVelocity;
}

function resolveCollisions() {
	const els = [{ element: $title }, ...icons];
	
	for (let i = 0; i < els.length; i++) {
		const el1 = els[i];

		for (let j = i + 1; j < els.length; j++) {
			const el2 = els[j];

			// Check if any elements overlap...
			if (elementsOverlap(el1.element, el2.element)) {
				// If so, move one icon and check for further collisions.
				getRandomIconPosition(el2);
				resolveCollisions();
			}
		}
	}
}

/**
 * @param {HTMLElement} $el1
 * @param {HTMLElement} $el2
 */
function elementsOverlap($el1, $el2) {
	const rect1 = $el1.getBoundingClientRect();
	const rect2 = $el2.getBoundingClientRect();
  
	return !(
		rect1.top > rect2.bottom ||
		rect1.right < rect2.left ||
		rect1.bottom < rect2.top ||
		rect1.left > rect2.right
	);
}

/**
 * @param {HTMLElement} $el1
 * @param {HTMLElement} $el2
 */
function elementsOverlapOrientation($el1, $el2) {
	const rect1 = $el1.getBoundingClientRect();
	const rect2 = $el2.getBoundingClientRect();

	var dx = (rect1.x + rect1.width / 2) - (rect2.x + rect2.width / 2);
    var dy = (rect1.y + rect1.height / 2 ) - (rect2.y + rect2.height / 2);
    var width = (rect1.width + rect2.width) / 2;
    var height = (rect1.height + rect2.height) / 2;
    var crossWidth = width * dy;
    var crossHeight = height * dx;
    var collision = 'none';

    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
        if (crossWidth > crossHeight) {
            collision = crossWidth > -1 * crossHeight ? 'bottom' : 'left';
        } else {
            collision = crossWidth > -1 * crossHeight ? 'right' : 'top';
        }
    }

    return collision;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function startIcons() {
	animationFrame = window.requestAnimationFrame(generateNextFrame);
}

function generateNextFrame() {
	const headerRect = $header.getBoundingClientRect();

	// Update Icon Positions...
	for (let i = 0; i < icons.length; i++) {
		const icon = icons[i];
		const $icon = icon.element;
		let edgeHit = false;

		icon.left += icon.horizontalVelocity;
		icon.top += icon.verticalVelocity;
		$icon.style.transform = `translate(${icon.left}px, ${icon.top}px)`;

		// If the icon hits an edge, make it bounce...
		const rect = $icon.getBoundingClientRect();

		// Check if a vertical edge is hit...
		if (rect.left < 0 || rect.left + rect.width > headerRect.width) {
			icon.left -= icon.horizontalVelocity;
			icon.horizontalVelocity *= -1;
			edgeHit = true;
		}

		// Check if a horizontal edge is hit...
		if (rect.top < 0 || rect.top + rect.height > headerRect.height) {
			icon.top -= icon.verticalVelocity;
			icon.verticalVelocity *= -1;
			edgeHit = true;
		}

		// If an edge was hit...
		if (edgeHit) {
			// Update the icon position.
			icon.left += icon.horizontalVelocity;
			icon.top += icon.verticalVelocity;
			$icon.style.transform = `translate(${icon.left}px, ${icon.top}px)`;
		}

		// Check if the icon has hit the title...
		const titleCollision = elementsOverlapOrientation($title, icon.element);
		if (titleCollision !== 'none') {
			// If so, we need to update the velocities of the icon
			switch (titleCollision) {
				case 'left':
					icon.horizontalVelocity = Math.abs(icon.horizontalVelocity);
					break;
				case 'right':
					icon.horizontalVelocity = -1 * Math.abs(icon.horizontalVelocity);
					break;
				case 'top':
					icon.verticalVelocity = Math.abs(icon.verticalVelocity);
					break;
				case 'bottom':
					icon.verticalVelocity = -1 * Math.abs(icon.verticalVelocity);
					break;
			}

			icon.left += icon.horizontalVelocity;
			icon.top += icon.verticalVelocity;
			$icon.style.transform = `translate(${icon.left}px, ${icon.top}px)`;
		}

		// Check if the icon has hit another icon...
		for (let j = i + 1; j < icons.length; j++) {
			const icon2 = icons[j];

			// Check if any elements overlap...
			const collision = elementsOverlapOrientation(icon.element, icon2.element);
			if (collision !== 'none') {
				if (collision === 'left' || collision === 'right') {
					icon.horizontalVelocity *= -1;
					icon2.horizontalVelocity *= -1;
				} else if (collision === 'top' || collision === 'bottom') {
					icon.verticalVelocity *= -1;
					icon2.verticalVelocity *= -1;
				}
				switch (collision) {
					case 'left':
						icon.horizontalVelocity = -1 * Math.abs(icon.horizontalVelocity);
						icon2.horizontalVelocity = Math.abs(icon2.horizontalVelocity);
						break;
					case 'right':
						icon.horizontalVelocity = Math.abs(icon.horizontalVelocity);
						icon2.horizontalVelocity = -1 * Math.abs(icon2.horizontalVelocity);
						break;
					case 'top':
						icon.verticalVelocity = -1 * Math.abs(icon.verticalVelocity);
						icon2.verticalVelocity = Math.abs(icon2.verticalVelocity);
						break;
					case 'bottom':
						icon.verticalVelocity = Math.abs(icon.verticalVelocity);
						icon2.verticalVelocity = -1 * Math.abs(icon2.verticalVelocity);
						break;
				}

				icon.left += icon.horizontalVelocity;
				icon.top += icon.verticalVelocity;
				$icon.style.transform = `translate(${icon.left}px, ${icon.top}px)`;
				$icon.dataset.animate = 'true';

				icon2.left += icon2.horizontalVelocity;
				icon2.top += icon2.verticalVelocity;
				icon2.element.style.transform = `translate(${icon2.left}px, ${icon2.top}px)`;
				icon2.element.animate = 'true';

				setTimeout(() => {
					$icon.dataset.animate = 'false';
					icon2.element.animate = 'false';
				}, 500);
			}
		}
	}

	animationFrame = window.requestAnimationFrame(generateNextFrame);
}

document.addEventListener("scroll", () => {
	window.cancelAnimationFrame(animationFrame);
});

// https://developers.google.com/web/ilt/pwa/lab-offline-quickstart#52_activating_the_install_prompt
window.addEventListener('beforeinstallprompt', (event) => {

	// Prevent Chrome 67 and earlier from automatically showing the prompt
	event.preventDefault();

	// Stash the event so it can be triggered later.
	deferredPrompt = event;

	// Attach the install prompt to a user gesture
	const $install = document.getElementById('install');
	if ($install) {
		$install.addEventListener('click', (event) => {

			// Show the prompt
			deferredPrompt.prompt();
	
			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
				}
				else {
					console.log('User dismissed the A2HS prompt');
				}
				deferredPrompt = null;
			});
		});
	
		$install.setAttribute('aria-hidden', 'false');
	}
});

// When the app is installed it should remove the install snackbar
window.addEventListener('appinstalled', (event) => {
	console.log('a2hs installed');
	const $install = document.getElementById('install');
	if ($install) {
		$install.setAttribute('aria-hidden', 'true');
	}
});