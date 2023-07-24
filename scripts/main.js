// Enums

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

	revertPosition() {
		this.bottom -= this.verticalVelocity;
		this.left -= this.horizontalVelocity;
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

class Pokémon {
	constructor(type1, type2, defenseRating = 1000, offenseRating = 1000) {
		this.type1 = type1;
		this.type2 = type2;
		this.defenseRating = defenseRating;
		this.offenseRating = offenseRating;
		// this.defenseWins = [];
		// this.defenseDraws = [];
		// this.defenseLosses = [];
		// this.offenseWins = [];
		// this.offenseDraws = [];
		// this.offenseLosses = [];
	}
}

class Bug {
	constructor() {
		this.type = types.BUG;
		this.weakens = [
			types.DARK,
			types.GRASS,
			types.PSYCHIC,
		];
		this.resistedBy = [
			types.FAIRY,
			types.FIGHTING,
			types.FIRE,
			types.FLYING,
			types.GHOST,
			types.POISON,
			types.STEEL,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.FIGHTING,
			types.GRASS,
			types.GROUND,
		]
		this.weakTo = [
			types.FIRE,
			types.FLYING,
			types.ROCK,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Dark {
	constructor() {
		this.type = types.DARK;
		this.weakens = [
			types.GHOST,
			types.PSYCHIC,
		];
		this.resistedBy = [
			types.DARK,
			types.FAIRY,
			types.FIGHTING,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.DARK,
			types.GHOST,
		]
		this.weakTo = [
			types.BUG,
			types.FAIRY,
			types.FIGHTING,
		];
		this.unaffectedBy = [
			types.PSYCHIC,
		];
	}
}

class Dragon {
	constructor() {
		this.type = types.DRAGON;
		this.weakens = [
			types.DRAGON,
		];
		this.resistedBy = [
			types.STEEL,
		];
		this.unaffects = [
			types.FAIRY,
		];
		this.resistantTo = [
			types.ELECTRIC,
			types.FIRE,
			types.GRASS,
			types.WATER,
		]
		this.weakTo = [
			types.DRAGON,
			types.FAIRY,
			types.ICE,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Electric {
	constructor() {
		this.type = types.ELECTRIC;
		this.weakens = [
			types.FLYING,
			types.WATER,
		];
		this.resistedBy = [
			types.DRAGON,
			types.ELECTRIC,
			types.GRASS,
		];
		this.unaffects = [
			types.GROUND,
		];
		this.resistantTo = [
			types.ELECTRIC,
			types.FLYING,
			types.STEEL,
		]
		this.weakTo = [
			types.GROUND,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Fairy {
	constructor() {
		this.type = types.FAIRY;
		this.weakens = [
			types.DARK,
			types.DRAGON,
			types.FIGHTING,
		];
		this.resistedBy = [
			types.FIRE,
			types.POISON,
			types.STEEL,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.BUG,
			types.DARK,
			types.FIGHTING,
		]
		this.weakTo = [
			types.POISON,
			types.STEEL,
		];
		this.unaffectedBy = [
			types.DRAGON,
		];
	}
}

class Fire {
	constructor() {
		this.type = types.FIRE;
		this.weakens = [
			types.BUG,
			types.GRASS,
			types.ICE,
			types.STEEL,
		];
		this.resistedBy = [
			types.DRAGON,
			types.FIRE,
			types.ROCK,
			types.WATER,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.BUG,
			types.FAIRY,
			types.FIRE,
			types.GRASS,
			types.ICE,
			types.STEEL,
		]
		this.weakTo = [
			types.GROUND,
			types.ROCK,
			types.WATER,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Fighting {
	constructor() {
		this.type = types.FIGHTING;
		this.weakens = [
			types.DARK,
			types.ICE,
			types.NORMAL,
			types.ROCK,
			types.STEEL,
		];
		this.resistedBy = [
			types.BUG,
			types.FAIRY,
			types.FLYING,
			types.POISON,
			types.PSYCHIC,
		];
		this.unaffects = [
			types.GHOST,
		];
		this.resistantTo = [
			types.BUG,
			types.DARK,
			types.ROCK,
		]
		this.weakTo = [
			types.FAIRY,
			types.FLYING,
			types.PSYCHIC,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Flying {
	constructor() {
		this.type = types.FLYING;
		this.weakens = [
			types.BUG,
			types.FIGHTING,
			types.GRASS,
		];
		this.resistedBy = [
			types.ELECTRIC,
			types.ROCK,
			types.STEEL,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.BUG,
			types.FIGHTING,
			types.GRASS,
		]
		this.weakTo = [
			types.ELECTRIC,
			types.ICE,
			types.ROCK,
		];
		this.unaffectedBy = [
			types.GROUND,
		];
	}
}

class Ghost {
	constructor() {
		this.type = types.GHOST;
		this.weakens = [
			types.GHOST,
			types.PSYCHIC,
		];
		this.resistedBy = [
			types.DARK,
		];
		this.unaffects = [
			types.NORMAL,
		];
		this.resistantTo = [
			types.BUG,
			types.POISON,
		]
		this.weakTo = [
			types.DARK,
			types.GHOST,
		];
		this.unaffectedBy = [
			types.NORMAL,
			types.FIGHTING,
		];
	}
}

class Grass {
	constructor() {
		this.type = types.GRASS;
		this.weakens = [
			types.GROUND,
			types.ROCK,
			types.WATER,
		];
		this.resistedBy = [
			types.BUG,
			types.DRAGON,
			types.FIRE,
			types.FLYING,
			types.GRASS,
			types.POISON,
			types.STEEL,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.ELECTRIC,
			types.GRASS,
			types.GROUND,
			types.WATER,
		]
		this.weakTo = [
			types.BUG,
			types.FIRE,
			types.FLYING,
			types.ICE,
			types.POISON,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Ground {
	constructor() {
		this.type = types.GROUND;
		this.weakens = [
			types.ELECTRIC,
			types.FIRE,
			types.POISON,
			types.ROCK,
			types.STEEL,
		];
		this.resistedBy = [
			types.BUG,
			types.GRASS,
		];
		this.unaffects = [
			types.FLYING,
		];
		this.resistantTo = [
			types.POISON,
			types.ROCK,
		]
		this.weakTo = [
			types.GRASS,
			types.ICE,
			types.WATER,
		];
		this.unaffectedBy = [
			types.ELECTRIC,
		];
	}
}

class Ice {
	constructor() {
		this.type = types.ICE;
		this.weakens = [
			types.DRAGON,
			types.FLYING,
			types.GRASS,
			types.GROUND,
		];
		this.resistedBy = [
			types.FIRE,
			types.ICE,
			types.STEEL,
			types.WATER,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.ICE,
		]
		this.weakTo = [
			types.FIGHTING,
			types.FIRE,
			types.ROCK,
			types.STEEL,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Normal {
	constructor() {
		this.type = types.NORMAL;
		this.weakens = [
			
		];
		this.resistedBy = [
			types.ROCK,
			types.STEEL,
		];
		this.unaffects = [
			types.GHOST,
		];
		this.resistantTo = [
			
		]
		this.weakTo = [
			types.FIGHTING,
		];
		this.unaffectedBy = [
			types.GHOST,
		];
	}
}

class Poison {
	constructor() {
		this.type = types.POISON;
		this.weakens = [
			types.FAIRY,
			types.GRASS,
		];
		this.resistedBy = [
			types.POISON,
			types.GROUND,
			types.ROCK,
			types.GHOST,
		];
		this.unaffects = [
			types.STEEL,
		];
		this.resistantTo = [
			types.FIGHTING,
			types.POISON,
			types.BUG,
			types.GRASS,
			types.FAIRY,
		]
		this.weakTo = [
			types.GROUND,
			types.PSYCHIC,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Psychic {
	constructor() {
		this.type = types.PSYCHIC;
		this.weakens = [
			types.FIGHTING,
			types.POISON,
		];
		this.resistedBy = [
			types.PSYCHIC,
			types.STEEL,
		];
		this.unaffects = [
			types.DARK,
		];
		this.resistantTo = [
			types.FIGHTING,
			types.PSYCHIC,
		]
		this.weakTo = [
			types.BUG,
			types.DARK,
			types.GHOST,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Rock {
	constructor() {
		this.type = types.ROCK;
		this.weakens = [
			types.BUG,
			types.FIRE,
			types.FLYING,
			types.ICE,
		];
		this.resistedBy = [
			types.FIGHTING,
			types.GROUND,
			types.STEEL,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.FIRE,
			types.FLYING,
			types.NORMAL,
			types.POISON,
		]
		this.weakTo = [
			types.FIGHTING,
			types.GRASS,
			types.GROUND,
			types.STEEL,
			types.WATER,
		];
		this.unaffectedBy = [
			
		];
	}
}

class Steel {
	constructor() {
		this.type = types.STEEL;
		this.weakens = [
			types.FAIRY,
			types.ICE,
			types.ROCK,
		];
		this.resistedBy = [
			types.ELECTRIC,
			types.FIRE,
			types.STEEL,
			types.WATER,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.BUG,
			types.DRAGON,
			types.FAIRY,
			types.FLYING,
			types.GRASS,
			types.ICE,
			types.NORMAL,
			types.PSYCHIC,
			types.ROCK,
			types.STEEL,
		]
		this.weakTo = [
			types.FIGHTING,
			types.FIRE,
			types.GROUND,
		];
		this.unaffectedBy = [
			types.POISON,
		];
	}
}

class Water {
	constructor() {
		this.type = types.WATER;
		this.weakens = [
			types.FIRE,
			types.GROUND,
			types.ROCK,
		];
		this.resistedBy = [
			types.DRAGON,
			types.GRASS,
			types.WATER,
		];
		this.unaffects = [
			
		];
		this.resistantTo = [
			types.FIRE,
			types.ICE,
			types.STEEL,
			types.WATER,
		]
		this.weakTo = [
			types.ELECTRIC,
			types.GRASS,
		];
		this.unaffectedBy = [
			
		];
	}
}

// Elements
const $header = document.querySelector('header');
const $title = document.querySelector('h1');
const $oneTypeContainer = document.querySelector('[data-type-count="1"]');
const $runOneTypeElo = $oneTypeContainer.querySelector('[data-run-elo]');
const $oneTypeGrid = $oneTypeContainer.querySelector('[data-grid]');
const $oneTypeDevelopmentCoefficient = $oneTypeContainer.querySelector('[data-development-coefficient]');
const $oneTypeRating = $oneTypeContainer.querySelector('[data-rating]');
const $oneTypeScale = $oneTypeContainer.querySelector('[data-scale]');
const $oneTypeSeasons = $oneTypeContainer.querySelector('[data-seasons]');
const $twoTypeContainer = document.querySelector('[data-type-count="2"]');
const $runTwoTypeElo = $twoTypeContainer.querySelector('[data-run-elo]');
const $twoTypeGrid = $twoTypeContainer.querySelector('[data-grid]');
const $twoTypeDevelopmentCoefficient = $twoTypeContainer.querySelector('[data-development-coefficient]');
const $twoTypeRating = $twoTypeContainer.querySelector('[data-rating]');
const $twoTypeScale = $twoTypeContainer.querySelector('[data-scale]');
const $twoTypeSeasons = $twoTypeContainer.querySelector('[data-seasons]');

// Constants
const icons = [];
const typeClasses = [
	new Bug(),
	new Dark(),
	new Dragon(),
	new Electric(),
	new Fairy(),
	new Fire(),
	new Fighting(),
	new Flying(),
	new Ghost(),
	new Grass(),
	new Ground(),
	new Ice(),
	new Normal(),
	new Poison(),
	new Psychic(),
	new Rock(),
	new Steel(),
	new Water(),
];
const typeClassCount = typeClasses.length;

// Variables
let animationFrame;
var deferredPrompt;
let oneTypeGrid;
let twoTypeGrid;

document.addEventListener('DOMContentLoaded', () => {
	loadIcons();
	startIcons();
	runOneTypeElo();
	// TODO: Make this run on page load. Maybe using service workers?
	// runTwoTypeElo();
	registerEventListeners();
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
		const circleData = getCircleData(icon1.element, $title);
		if (circleData.overlap) {
			// If so, move the icon and check for further collisions.
			icon1.getRandomIconPosition();
			overlap = true;
			break;
		}

		for (let j = i + 1; j < icons.length; j++) {
			const icon2 = icons[j];

			// Check if any elements overlap...
			const circleData = getCircleData(icon1.element, icon2.element);
			if (circleData.overlap) {
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
function getCircleData($circle1, $circle2) {
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
	
	if (d > r1 + r2) {
		return {
			overlap: false,
		};
	}
	
	return {
		angle: getAngle(dx, dy),
		overlap: true,
	};
}

/**
 * @param {number} dx
 * @param {number} dy
 */
function getAngle(dx, dy) {
	if (Math.abs(dx) < 1) {
		if (dy < 0) {
			return Math.PI / 2;
		} else {
			return 3 * Math.PI / 2;
		}
	}

	return Math.atan2(dy, dx); // range (-PI, PI]
}

function startIcons() {
	if (window.scrollY === 0) {
		animationFrame = window.requestAnimationFrame(generateNextFrame);
	}
}

function generateNextFrame() {
	const headerRect = $header.getBoundingClientRect();

	// Update Icon Positions...
	for (let i = 0; i < icons.length; i++) {
		const icon1 = icons[i];

		// Move the icon...
		icon1.updatePosition();

		// If the icon hits an edge, make it bounce...
		const rect = icon1.element.getBoundingClientRect();

		// Check if a vertical edge is hit...
		if (rect.left < 0 || rect.left + rect.width > headerRect.width) {
			icon1.revertPosition();
			icon1.horizontalVelocity *= -1;
			icon1.updatePosition();
		}

		// Check if a horizontal edge is hit...
		if (rect.top < 0 || rect.top + rect.height > headerRect.height) {
			icon1.revertPosition();
			icon1.verticalVelocity *= -1;
			icon1.updatePosition();
		}

		// Check if the icon has hit the title...
		const circleData = getCircleData(icon1.element, $title);
		if (circleData.overlap) {
			// If so, we need to update the velocities of the icon
			// https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
			icon1.revertPosition();

			const phi = circleData.angle;
			
			const theta1 = getAngle(100 * icon1.horizontalVelocity, 100 * icon1.verticalVelocity);
			const o = Math.PI + (2 * phi) - theta1;
			
			const v1 = Math.sqrt(Math.pow(icon1.horizontalVelocity, 2) + Math.pow(icon1.verticalVelocity, 2));
			const v1x = Math.cos(o);
			const v1y = Math.sin(o);
			const v1Norm = Math.sqrt(Math.pow(v1x, 2) + Math.pow(v1y, 2));

			icon1.horizontalVelocity = v1 * v1x / v1Norm;
			icon1.verticalVelocity = v1 * v1y / v1Norm;
			icon1.updatePosition();
		}

		// Check if the icon has hit another icon...
		for (let j = i + 1; j < icons.length; j++) {
			const icon2 = icons[j];

			// Check if any elements overlap...
			const circleData = getCircleData(icon1.element, icon2.element);
			if (circleData.overlap) {
				// If so, we need to update the velocities of the icons
				icon1.revertPosition();
				icon2.revertPosition();
				
				const phi = circleData.angle;
				const theta1 = getAngle(100 * icon1.horizontalVelocity, 100 * icon1.verticalVelocity);
				const theta2 = getAngle(100 * icon2.horizontalVelocity, 100 * icon2.verticalVelocity);

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

function runOneTypeElo() {
	developmentCoefficient = Number($oneTypeDevelopmentCoefficient.value) || 32;
	rating = Number($oneTypeRating.value) || 1000;
	scale = Number($oneTypeScale.value) || 400;
	seasons = Number($oneTypeSeasons.value) || 100;

	const pokémon = [];
	for (let type1Index = 0; type1Index < typeClassCount; type1Index++) {
		pokémon.push(new Pokémon(typeClasses[type1Index], undefined, rating, rating));
	};

	for (let i = 0; i < seasons; i++) {
		shuffle(pokémon);
		
		// Run through every combination of battles.
		for (let j = 0; j < pokémon.length; j += 1) {
			for (let k = 0; k < pokémon.length; k += 1) {
				if (j < k) {
					battle(pokémon[j], pokémon[k], developmentCoefficient, scale);
				}
			}
		}
	}

	const pokémonFormatted = pokémon.map(poké => {
		return {
			type: gridjs.html(`<div class="pokemon-types"><p class="pokemon-type ${poké.type1.type}">${poké.type1.type}</p></div>`),
			offenseRating: Math.round(10 * poké.offenseRating) / 10,
			defenseRating: Math.round(10 * poké.defenseRating) / 10,
			averageRating: Math.round(10 * (poké.defenseRating + poké.offenseRating) / 2) / 10,
		}
	})
	pokémonFormatted.sort((a, b) => {
		return b.averageRating - a.averageRating;
	});
	
	if (oneTypeGrid) {
		// https://github.com/grid-js/gridjs/issues/1291#issuecomment-1549489308
		Promise.resolve(oneTypeGrid.config.plugin.remove("pagination"))
		.then(() => {
			oneTypeGrid.updateConfig({
				data: pokémonFormatted
			}).forceRender();
		});
	} else {
		oneTypeGrid = new gridjs.Grid({ 
			columns: [
				{
					id: 'type',
					name: 'Type',
				},
				{
					id: 'offenseRating',
					name: 'Offense Elo',
					sort: true,
				},
				{
					id: 'defenseRating',
					name: 'Defense Elo',
					sort: true,
				},
				{
					id: 'averageRating',
					name: 'Average Elo',
					sort: true,
				},
			],
			data: pokémonFormatted,
			pagination: {
				limit: 10
			},
			fixedHeader: true,
		}).render($oneTypeGrid);
	}
}

function runTwoTypeElo() {
	developmentCoefficient = Number($twoTypeDevelopmentCoefficient.value) || 32;
	rating = Number($twoTypeRating.value) || 1000;
	scale = Number($twoTypeScale.value) || 400;
	seasons = Number($twoTypeSeasons.value) || 100;

	const pokémon = [];
	for (let type1Index = 0; type1Index < typeClassCount; type1Index++) {
		pokémon.push(new Pokémon(typeClasses[type1Index], undefined, rating, rating));

		for (let type2Index = type1Index + 1; type2Index < typeClassCount; type2Index++) {
			pokémon.push(new Pokémon(typeClasses[type1Index], typeClasses[type2Index], rating, rating));
		};
	};

	for (let i = 0; i < seasons; i++) {
		shuffle(pokémon);
		
		// Run through every combination of battles.
		for (let j = 0; j < pokémon.length; j += 1) {
			for (let k = 0; k < pokémon.length; k += 1) {
				if (j < k) {
					battle(pokémon[j], pokémon[k], developmentCoefficient, scale);
				}
			}
		}
	}

	const pokémonFormatted = pokémon.map(poké => {
		let type = `<div class="pokemon-types"><p class="pokemon-type ${poké.type1.type}">${poké.type1.type}</p>`;
		if (poké.type2) {
			type += `<p class="pokemon-type ${poké.type2.type}">${poké.type2.type}</p>`;
		}
		type += '</div>';

		return {
			type: gridjs.html(type),
			offenseRating: Math.round(10 * poké.offenseRating) / 10,
			defenseRating: Math.round(10 * poké.defenseRating) / 10,
			averageRating: Math.round(10 * (poké.defenseRating + poké.offenseRating) / 2) / 10,
		}
	})
	pokémonFormatted.sort((a, b) => {
		return b.averageRating - a.averageRating;
	});
	
	if (twoTypeGrid) {
		// https://github.com/grid-js/gridjs/issues/1291#issuecomment-1549489308
		Promise.resolve(twoTypeGrid.config.plugin.remove("pagination"))
			.then(() => {
				twoTypeGrid.updateConfig({
					data: pokémonFormatted
				}).forceRender();
			});
	} else {
		twoTypeGrid = new gridjs.Grid({ 
			columns: [
				{
					id: 'type',
					name: 'Type',
				},
				{
					id: 'offenseRating',
					name: 'Offense Elo',
					sort: true,
				},
				{
					id: 'defenseRating',
					name: 'Defense Elo',
					sort: true,
				},
				{
					id: 'averageRating',
					name: 'Average Elo',
					sort: true,
				},
			],
			data: pokémonFormatted,
			pagination: {
				limit: 10
			},
			fixedHeader: true,
		}).render($twoTypeGrid);
	}
}

function battle(pokémon1, pokémon2, developmentCoefficient = 32, scale = 400) {
	let pokémon1Attack = 1;
	let pokémon1Defense = 1;
	let pokémon1Type1Attack = 1;
	let pokémon1Type2Attack = 1;
	let pokémon1Type1Defense = 1;
	let pokémon1Type2Defense = 1;
	let pokémon2Attack = 1;
	let pokémon2Defense = 1;
	let pokémon2Type1Attack = 1;
	let pokémon2Type2Attack = 1;
	let pokémon2Type1Defense = 1;
	let pokémon2Type2Defense = 1;
	
	if (pokémon1.type1?.weakens?.includes(pokémon2.type1?.type)) {
		pokémon1Type1Attack *= 2;
		pokémon2Type1Defense /= 2;
	}
	
	if (pokémon1.type1?.weakens?.includes(pokémon2.type2?.type)) {
		pokémon1Type1Attack *= 2;
		pokémon2Type1Defense /= 2;
	}
	
	if (pokémon1.type1?.resistedBy?.includes(pokémon2.type1?.type)) {
		pokémon1Type1Attack /= 2;
		pokémon2Type1Defense *= 2;
	}
	
	if (pokémon1.type1?.resistedBy?.includes(pokémon2.type2?.type)) {
		pokémon1Type1Attack /= 2;
		pokémon2Type1Defense *= 2;
	}
	
	if (pokémon1.type1?.unaffects?.includes(pokémon2.type1?.type)) {
		pokémon1Type1Attack = 0;
		pokémon2Type1Defense = Infinity;
	}
	
	if (pokémon1.type1?.unaffects?.includes(pokémon2.type2?.type)) {
		pokémon1Type1Attack = 0;
		pokémon2Type1Defense = Infinity;
	}

	pokémon1Attack = pokémon1Type1Attack;
	pokémon2Defense = pokémon2Type1Defense;

	if (pokémon1.type2) {
		if (pokémon1.type2?.weakens?.includes(pokémon2.type1?.type)) {
			pokémon1Type2Attack *= 2;
			pokémon2Type2Defense /= 2;
		}
		
		if (pokémon1.type2?.weakens?.includes(pokémon2.type2?.type)) {
			pokémon1Type2Attack *= 2;
			pokémon2Type2Defense /= 2;
		}
		
		if (pokémon1.type2?.resistedBy?.includes(pokémon2.type1?.type)) {
			pokémon1Type2Attack /= 2;
			pokémon2Type2Defense *= 2;
		}
		
		if (pokémon1.type2?.resistedBy?.includes(pokémon2.type2?.type)) {
			pokémon1Type2Attack /= 2;
			pokémon2Type2Defense *= 2;
		}
		
		if (pokémon1.type2?.unaffects?.includes(pokémon2.type1?.type)) {
			pokémon1Type2Attack = 0;
			pokémon2Type2Defense = Infinity;
		}
		
		if (pokémon1.type2?.unaffects?.includes(pokémon2.type2?.type)) {
			pokémon1Type2Attack = 0;
			pokémon2Type2Defense = Infinity;
		}

		if (pokémon1Type2Attack > pokémon1Type1Attack) {
			pokémon1Attack = pokémon1Type2Attack;
			pokémon2Defense = pokémon2Type2Defense;
		}
	}


	
	if (pokémon2.type1?.weakens?.includes(pokémon1.type1?.type)) {
		pokémon1Type1Defense /= 2;
		pokémon2Type1Attack *= 2;
	}

	if (pokémon2.type1?.weakens?.includes(pokémon1.type2?.type)) {
		pokémon1Type1Defense /= 2;
		pokémon2Type1Attack *= 2;
	}
	
	if (pokémon2.type1?.resistedBy?.includes(pokémon1.type1?.type)) {
		pokémon1Type1Defense *= 2;
		pokémon2Type1Attack /= 2;
	}
	
	if (pokémon2.type1?.resistedBy?.includes(pokémon1.type2?.type)) {
		pokémon1Type1Defense *= 2;
		pokémon2Type1Attack /= 2;
	}
	
	if (pokémon2.type1?.unaffects?.includes(pokémon1.type1?.type)) {
		pokémon1Type1Defense = Infinity;
		pokémon2Type1Attack = 0;
	}
	
	if (pokémon2.type1?.unaffects?.includes(pokémon1.type2?.type)) {
		pokémon1Type1Defense = Infinity;
		pokémon2Type1Attack = 0;
	}

	pokémon1Defense = pokémon1Type1Defense;
	pokémon2Attack = pokémon2Type1Attack;
	
	if (pokémon2.type2) {
		if (pokémon2.type2?.weakens?.includes(pokémon1.type1?.type)) {
			pokémon1Type2Defense /= 2;
			pokémon2Type2Attack *= 2;
		}
	
		if (pokémon2.type2?.weakens?.includes(pokémon1.type2?.type)) {
			pokémon1Type2Defense /= 2;
			pokémon2Type2Attack *= 2;
		}
		
		if (pokémon2.type2?.resistedBy?.includes(pokémon1.type1?.type)) {
			pokémon1Type2Defense *= 2;
			pokémon2Type2Attack /= 2;
		}
		
		if (pokémon2.type2?.resistedBy?.includes(pokémon1.type2?.type)) {
			pokémon1Type2Defense *= 2;
			pokémon2Type2Attack /= 2;
		}
		
		if (pokémon2.type2?.unaffects?.includes(pokémon1.type1?.type)) {
			pokémon1Type2Defense = Infinity;
			pokémon2Type2Attack = 0;
		}
		
		if (pokémon2.type2?.unaffects?.includes(pokémon1.type2?.type)) {
			pokémon1Type2Defense = Infinity;
			pokémon2Type2Attack = 0;
		}
	
		if (pokémon2Type2Attack > pokémon2Type1Attack) {
			pokémon1Defense = pokémon1Type2Defense;
			pokémon2Attack = pokémon2Type2Attack;
		}
	}
	
	
	
	let pokémon1AttackScore = 0;
	let pokémon2DefenseScore = 0;
	if (pokémon1Attack > pokémon2Defense) {
		pokémon1AttackScore = 1;
		pokémon2DefenseScore = 0;
		
		// pokémon1.offenseWins.push(pokémon2.type);
		// pokémon2.defenseLosses.push(pokémon1.type);
	} else if (pokémon1Attack < pokémon2Defense) {
		pokémon1AttackScore = 0;
		pokémon2DefenseScore = 1;
		
		// pokémon1.offenseLosses.push(pokémon2.type);
		// pokémon2.defenseWins.push(pokémon1.type);
	} else {
		pokémon1AttackScore = 0.5;
		pokémon2DefenseScore = 0.5;
		
		// pokémon1.offenseDraws.push(pokémon2.type);
		// pokémon2.defenseDraws.push(pokémon1.type);
	}
	
	let pokémon1DefenseScore = 0;
	let pokémon2AttackScore = 0;
	if (pokémon1Defense > pokémon2Attack) {
		pokémon1DefenseScore = 1;
		pokémon2AttackScore = 0;
		
		// pokémon1.defenseWins.push(pokémon2.type);
		// pokémon2.offenseLosses.push(pokémon1.type);
	} else if (pokémon1Defense < pokémon2Attack) {
		pokémon1DefenseScore = 0;
		pokémon2AttackScore = 1;
		
		// pokémon1.defenseLosses.push(pokémon2.type);
		// pokémon2.offenseWins.push(pokémon1.type);
	} else {
		pokémon1DefenseScore = 0.5;
		pokémon2AttackScore = 0.5;
		
		// pokémon1.defenseDraws.push(pokémon2.type);
		// pokémon2.offenseDraws.push(pokémon1.type);
	}
	
	// Calculate Scores
	const difference1 = pokémon2.defenseRating - pokémon1.offenseRating;
	const differenceRatio1 = 1.0 * difference1 / scale;
	const power1 = 1 + Math.pow(10, differenceRatio1);
	const expectedScore1 = 1 / power1;
	const newRating1 = Math.round(10 * (pokémon1.offenseRating + (developmentCoefficient * (pokémon1AttackScore - expectedScore1)))) / 10;
	
	const difference2 = pokémon1.defenseRating - pokémon2.offenseRating;
	const differenceRatio2 = 1.0 * difference2 / scale;
	const power2 = 1 + Math.pow(10, differenceRatio2);
	const expectedScore2 = 1 / power2;
	const newRating2 = Math.round(10 * (pokémon2.offenseRating + (developmentCoefficient * (pokémon2AttackScore - expectedScore2)))) / 10;
	
	const difference3 = pokémon2.offenseRating - pokémon1.defenseRating;
	const differenceRatio3 = 1.0 * difference3 / scale;
	const power3 = 1 + Math.pow(10, differenceRatio3);
	const expectedScore3 = 1 / power3;
	const newRating3 = Math.round(10 * (pokémon1.defenseRating + (developmentCoefficient * (pokémon1DefenseScore - expectedScore3)))) / 10;
	
	const difference4 = pokémon1.offenseRating - pokémon2.defenseRating;
	const differenceRatio4 = 1.0 * difference4 / scale;
	const power4 = 1 + Math.pow(10, differenceRatio4);
	const expectedScore4 = 1 / power4;
	const newRating4 = Math.round(10 * (pokémon2.defenseRating + (developmentCoefficient * (pokémon2DefenseScore - expectedScore4)))) / 10;
	
	// Update Scores
	pokémon1.offenseRating = newRating1;
	pokémon2.offenseRating = newRating2;
	pokémon1.defenseRating = newRating3;
	pokémon2.defenseRating = newRating4;
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function registerEventListeners() {
	document.addEventListener("scroll", (event) => {
		if (window.scrollY > 0) {
			window.cancelAnimationFrame(animationFrame);
		} else {
			animationFrame = window.requestAnimationFrame(generateNextFrame);
		}
	});

	if ($runOneTypeElo) {
		$runOneTypeElo.addEventListener('click', () => {
			runOneTypeElo();
		});
	}

	if ($runTwoTypeElo) {
		$runTwoTypeElo.addEventListener('click', () => {
			runTwoTypeElo();
		});
	}
	
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
}