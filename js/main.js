import { Game } from './game.js';
import { Preloader } from './preloader.js';

const config = {
	type: Phaser.Auto,
	widht: 950,
	height: 700,
	scene: [Game],
	physics: {
		default: 'arcade',
		arcade:{
			gravity: {y:0},
			debug: false
		}
	},
	scene: [Preloader, Game],
	scale: {
		zoom: 1.4
	}
}

export default new Phaser.Game(config);