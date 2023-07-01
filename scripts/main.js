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
	constructor(type) {
		this.bottom = 0;
		this.element;
		this.horizontalVelocity = 0;
		this.left = 0;
		this.scale = 1;
		this.type = type;
		this.verticalVelocity = 0;

		this.init();
	}

	init() {
		this.element = document.createElement('div');

		this.element.classList.add('icon');
		this.element.classList.add(this.type);
		$header.appendChild(this.element);

		const $icon = document.createElement('img');
		$icon.src = `images/icons/${this.type}.svg`;
		$icon.alt = `${this.type} icon`;
		this.element.appendChild($icon);

		this.getRandomIconPosition();
		this.getRandomIconVelocity();
	}

	getRandomIconPosition() {
		this.bottom = (Math.random() * (window.innerHeight - 100));
		this.left = (Math.random() * (window.innerWidth - 100 - 15));
		this.element.style.transform = `translate(${this.left}px, ${window.innerHeight - 100 - this.bottom}px) scale(${this.scale})`;
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
		this.bottom += this.verticalVelocity;
		this.left += this.horizontalVelocity;
		this.render();
	}

	render() {
		this.element.style.transform = `translate(${this.left}px, ${window.innerHeight - 100 - this.bottom}px) scale(${this.scale})`;
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
	loadIcons();
	startIcons();
});

function loadIcons() {
	if ($header) {
		// Loop over types...
		for (const [key, value] of Object.entries(types)) {
			const icon = new Icon(value);
			icons.push(icon);
		}
		
		resolveCollisions();
	}
}

function resolveCollisions() {
	let overlap = false;
	
	for (let i = 0; i < icons.length; i++) {
		const icon1 = icons[i];
		
		// Check if any icons overlap the title...
		if (circlesOverlap(icon1.element, $title)) {
			// If so, move the icon and check for further collisions.
			icon1.getRandomIconPosition();
			overlap = true;
			break;
		}

		for (let j = i + 1; j < icons.length; j++) {
			const icon2 = icons[j];

			// Check if any elements overlap...
			if (circlesOverlap(icon1.element, icon2.element)) {
				// If so, move one icon and check for further collisions.
				icon2.getRandomIconPosition();
				overlap = true;
				break;
			}
		}

		if (overlap) {
			break;
		}
	}

	if (overlap) {
		for (let i = 0; i < icons.length; i++) {
			const icon = icons[i];
			icon.scale -= 0.01;
			icon.render();
		}

		resolveCollisions();
	}
}

/**
 * @param {HTMLElement} $circle1
 * @param {HTMLElement} $circle2
 */
function circlesOverlap($circle1, $circle2) {
	const rect1 = $circle1.getBoundingClientRect();
	const r1 = rect1.width / 2;
	const centerX1 = rect1.x + r1;
	const centerY1 = rect1.y + r1;

	const rect2 = $circle2.getBoundingClientRect();
	const r2 = rect2.width / 2;
	const centerX2 = rect2.x + r2;
	const centerY2 = rect2.y + r2;

	const dx = centerX2 - centerX1;
	const dy = (centerY2 - centerY1) * -1;

	const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	
	return d < r1 + r2;
}

/**
 * @param {HTMLElement} $circle1
 * @param {HTMLElement} $circle2
 */
function circlesOverlapAngle($circle1, $circle2) {
	const rect1 = $circle1.getBoundingClientRect();
	const r1 = rect1.width / 2;
	const centerX1 = rect1.x + r1;
	const centerY1 = rect1.y + r1;

	const rect2 = $circle2.getBoundingClientRect();
	const r2 = rect2.width / 2;
	const centerX2 = rect2.x + r2;
	const centerY2 = rect2.y + r2;

	const dx = centerX2 - centerX1;
	const dy = (centerY2 - centerY1) * -1;
	
	return getAngle(dx, dy);
}

/**
 * @param {number} dx
 * @param {number} dy
 */
function getAngle(dx, dy) {
	if (Math.abs(dx) < 1) {
		if (dy < 0) {
			return 90;
		} else {
			return 270;
		}
	}
	let theta = Math.atan2(dy, dx); // range (-PI, PI]
	theta *= 180 / Math.PI;// range (-180, 180]

	if (theta < 0) {
		theta += 360; // range [0, 360)
	}

	return theta;
}

function startIcons() {
	animationFrame = window.requestAnimationFrame(generateNextFrame);
}

function generateNextFrame() {
	const headerRect = $header.getBoundingClientRect();

	// Update Icon Positions...
	for (let i = 0; i < icons.length; i++) {
		const icon1 = icons[i];
		let edgeHit = false;

		icon1.updatePosition();

		// If the icon hits an edge, make it bounce...
		const rect = icon1.element.getBoundingClientRect();

		// Check if a vertical edge is hit...
		if (rect.left < 0 || rect.left + rect.width > headerRect.width) {
			icon1.left -= icon1.horizontalVelocity;
			icon1.horizontalVelocity *= -1;
			edgeHit = true;
		}

		// Check if a horizontal edge is hit...
		if (rect.top < 0 || rect.top + rect.height > headerRect.height) {
			icon1.bottom -= icon1.verticalVelocity;
			icon1.verticalVelocity *= -1;
			edgeHit = true;
		}

		// If an edge was hit...
		if (edgeHit) {
			// Update the icon position.
			icon1.updatePosition();
		}

		// Check if the icon has hit the title...
		const overlap = circlesOverlap(icon1.element, $title);
		if (overlap) {
			// If so, we need to update the velocities of the icon
			// https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
			const angle = circlesOverlapAngle(icon1.element, $title);
			
			const d = getAngle(100 * icon1.horizontalVelocity, 100 * icon1.verticalVelocity);
			const o = 180 + (2 * angle) - d;
			
			const v = Math.sqrt(Math.pow(icon1.horizontalVelocity, 2) + Math.pow(icon1.verticalVelocity, 2));
			const v1x = Math.cos(Math.PI * (o / 180));
			const v1y = Math.sin(Math.PI * (o / 180));
			const v1Norm = Math.sqrt(Math.pow(v1x, 2) + Math.pow(v1y, 2));

			icon1.horizontalVelocity = v * v1x / v1Norm;
			icon1.verticalVelocity = v * v1y / v1Norm;
			icon1.updatePosition();
		}

		// Check if the icon has hit another icon...
		for (let j = i + 1; j < icons.length; j++) {
			const icon2 = icons[j];

			// Check if any elements overlap...
			const overlap = circlesOverlap(icon1.element, icon2.element);
			if (overlap) {
				// If so, we need to update the velocities of the icons
				
				const phiDeg = circlesOverlapAngle(icon1.element, icon2.element);
				const theta1Deg = getAngle(100 * icon1.horizontalVelocity, 100 * icon1.verticalVelocity);
				const theta2Deg = getAngle(100 * icon2.horizontalVelocity, 100 * icon2.verticalVelocity);

				const phi = Math.PI * (phiDeg / 180);
				const theta1 = Math.PI * (theta1Deg / 180);
				const theta2 = Math.PI * (theta2Deg / 180);

				const v1 = Math.sqrt(Math.pow(icon1.horizontalVelocity, 2) + Math.pow(icon1.verticalVelocity, 2));
				const v2 = Math.sqrt(Math.pow(icon2.horizontalVelocity, 2) + Math.pow(icon2.verticalVelocity, 2));

				const v1x = (v2 * Math.cos(theta2 - phi) * Math.cos(phi)) + (v1 * Math.sin(theta1 - phi) * Math.cos(phi + (Math.PI / 2)));
				const v1y = (v2 * Math.cos(theta2 - phi) * Math.sin(phi)) + (v1 * Math.sin(theta1 - phi) * Math.sin(phi + (Math.PI / 2)));

				const v2x = (v1 * Math.cos(theta1 - phi) * Math.cos(phi)) + (v2 * Math.sin(theta2 - phi) * Math.cos(phi + (Math.PI / 2)));
				const v2y = (v1 * Math.cos(theta1 - phi) * Math.sin(phi)) + (v2 * Math.sin(theta2 - phi) * Math.sin(phi + (Math.PI / 2)));

				icon1.horizontalVelocity = v1x;
				icon1.verticalVelocity = v1y;
				icon1.updatePosition();
				icon1.updatePosition();
				icon1.animate();

				icon2.horizontalVelocity = v2x;
				icon2.verticalVelocity = v2y;
				icon2.updatePosition();
				icon2.updatePosition();
				icon2.animate();
			}
		}
	}

	animationFrame = window.requestAnimationFrame(generateNextFrame);
}

document.addEventListener("scroll", (event) => {
	if (window.scrollY > 0) {

		window.cancelAnimationFrame(animationFrame);
	} else {
		animationFrame = window.requestAnimationFrame(generateNextFrame);
	}
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