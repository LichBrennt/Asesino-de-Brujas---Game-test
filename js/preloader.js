export class Preloader extends Phaser.Scene {

	constructor(){
		super({ key: 'preloader'});
	}

	preload(){
		// load map
		this.load.image('tiles', '../assets/map/0x72_DungeonTilesetII_v1.4.png');
		this.load.tilemapTiledJSON('dungeon','../assets/map/map-01-demo.json');
		// load caracter
		this.load.atlas('fauna', '../assets/character/fauna.png', '../assets/character/fauna.json');
	}

	create(){
		this.scene.start('game');
	}

	update(){
		
	}
}