// Enums

const overlap = {
	BOTTOM: 'bottom',
	LEFT: 'left',
	NONE: 'none',
	RIGHT: 'right',
	TOP: 'top',
}
Object.freeze(overlap);

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

// Classes

class Icon {
	constructor(element) {
		this.element = element;
		this.horizontalVelocity = 0;
		this.left = 0;
		this.top = 0;
		this.verticalVelocity = 0;

		this.getRandomIconPosition();
		this.getRandomIconVelocity();
	}

	getRandomIconPosition() {
		this.top = (Math.random() * (window.innerHeight - 100 - 15));
		this.left = (Math.random() * (window.innerWidth - 100 - 15));
		this.element.style.transform = `translate(${this.left}px, ${this.top}px)`;
	}

	getRandomIconVelocity() {
		let horizontalVelocity = 2 * Math.random() - 1;
		let verticalVelocity = 2 * Math.random() - 1;

		// Normalise
		const norm = Math.sqrt(horizontalVelocity**2 + verticalVelocity**2);
		horizontalVelocity /= norm;
		verticalVelocity /= norm;

		this.horizontalVelocity = horizontalVelocity;
		this.verticalVelocity = verticalVelocity;
	}

	updatePosition() {
		this.left += this.horizontalVelocity;
		this.top += this.verticalVelocity;
		this.element.style.transform = `translate(${this.left}px, ${this.top}px)`;
	}

	animate() {
		this.element.dataset.animate = 'true';

		setTimeout(() => {
			this.element.dataset.animate = 'false';
		}, 500);
	}
}

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
			const icon = new Icon($iconContainer);

			$iconContainer.classList.add('icon');
			$iconContainer.classList.add(value);
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

function resolveCollisions() {
	const els = [{ element: $title }, ...icons];
	
	for (let i = 0; i < els.length; i++) {
		const el1 = els[i];

		for (let j = i + 1; j < els.length; j++) {
			const el2 = els[j];

			// Check if any elements overlap...
			if (elementsOverlap(el1.element, el2.element)) {
				// If so, move one icon and check for further collisions.
				el2.getRandomIconPosition();
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
    var collision = overlap.NONE;

    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
        if (crossWidth > crossHeight) {
            collision = crossWidth > -1 * crossHeight ? overlap.BOTTOM : overlap.LEFT;
        } else {
            collision = crossWidth > -1 * crossHeight ? overlap.RIGHT : overlap.TOP;
        }
    }

    return collision;
}

function startIcons() {
	animationFrame = window.requestAnimationFrame(generateNextFrame);
}

function generateNextFrame() {
	const headerRect = $header.getBoundingClientRect();

	// Update Icon Positions...
	for (let i = 0; i < icons.length; i++) {
		const icon = icons[i];
		let edgeHit = false;

		icon.updatePosition();

		// If the icon hits an edge, make it bounce...
		const rect = icon.element.getBoundingClientRect();

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
			icon.updatePosition();
		}

		// Check if the icon has hit the title...
		const titleCollision = elementsOverlapOrientation($title, icon.element);
		if (titleCollision !== overlap.NONE) {
			// If so, we need to update the velocities of the icon
			switch (titleCollision) {
				case overlap.LEFT:
					icon.horizontalVelocity = Math.abs(icon.horizontalVelocity);
					break;
				case overlap.RIGHT:
					icon.horizontalVelocity = -1 * Math.abs(icon.horizontalVelocity);
					break;
				case overlap.TOP:
					icon.verticalVelocity = Math.abs(icon.verticalVelocity);
					break;
				case overlap.BOTTOM:
					icon.verticalVelocity = -1 * Math.abs(icon.verticalVelocity);
					break;
			}

			icon.updatePosition();
		}

		// Check if the icon has hit another icon...
		for (let j = i + 1; j < icons.length; j++) {
			const icon2 = icons[j];

			// Check if any elements overlap...
			const collision = elementsOverlapOrientation(icon.element, icon2.element);
			if (collision !== overlap.NONE) {
				switch (collision) {
					case overlap.LEFT:
						icon.horizontalVelocity = -1 * Math.abs(icon.horizontalVelocity);
						icon2.horizontalVelocity = Math.abs(icon2.horizontalVelocity);
						break;
					case overlap.RIGHT:
						icon.horizontalVelocity = Math.abs(icon.horizontalVelocity);
						icon2.horizontalVelocity = -1 * Math.abs(icon2.horizontalVelocity);
						break;
					case overlap.TOP:
						icon.verticalVelocity = -1 * Math.abs(icon.verticalVelocity);
						icon2.verticalVelocity = Math.abs(icon2.verticalVelocity);
						break;
					case overlap.BOTTOM:
						icon.verticalVelocity = Math.abs(icon.verticalVelocity);
						icon2.verticalVelocity = -1 * Math.abs(icon2.verticalVelocity);
						break;
				}

				icon.updatePosition();
				icon.animate();

				icon2.updatePosition();
				icon2.animate();
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