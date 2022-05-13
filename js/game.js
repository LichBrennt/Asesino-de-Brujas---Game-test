export class Game extends Phaser.Scene {

	// keys(){
	// 	Phaser.Types.Input.Keyboard.CursorKeys;
	// }
	cursors = Phaser.Input.Keyboard.CursorKeys;
	fauna = Phaser.Physics.Arcade.Sprite; 
	// fauna(){
	// 	Phaser.Physics.Arcade.Sprite;
	// }

	constructor(){
		super({ key: 'game'});
	}

	preload(){
		
	}

	create(){
		this.cursors = this.input.keyboard.createCursorKeys();

		// add map
		const map = this.make.tilemap({ key: 'dungeon' });
		const tileset = map.addTilesetImage('map-content-01','tiles');

		map.createLayer('ground', tileset);
		const wallslayer = map.createLayer('walls', tileset);
		wallslayer.setCollisionByProperty({ collides: true });

		const debugGraphics = this.add.graphics().setAlpha(0.7);
		wallslayer.renderDebug(debugGraphics,{
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(243,234,48,255),
			faceColor: new Phaser.Display.Color(40,39,37,255)
		});

		// add character
		this.fauna = this.physics.add.sprite(128,128, 'fauna', 'walk-down/walk-down-3.png');

		this.anims.create({
			key: 'fauna-idle-down',
			frames: [{ key: 'fauna', frame: 'walk-down/walk-down-3.png' }]
		});

		this.anims.create({
			key: 'fauna-idle-up',
			frames: [{ key: 'fauna', frame: 'walk-up/walk-up-3.png' }]
		});

		this.anims.create({
			key: 'fauna-idle-side',
			frames: [{ key: 'fauna', frame: 'walk-side/walk-side-3.png' }]
		});


		this.anims.create({
			key: 'fauna-run-down',
			frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-down/run-down-', suffix: '.png' }),
			repeat: -1,
			frameRate: 13
		});

		this.anims.create({
			key: 'fauna-run-up',
			frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-up/run-up-', suffix: '.png' }),
			repeat: -1,
			frameRate: 13
		});

		this.anims.create({
			key: 'fauna-run-side',
			frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'run-side/run-side-', suffix: '.png' }),
			repeat: -1,
			frameRate: 13
		});

		this.fauna.anims.play('fauna-idle-down');

	}

	update(t= number, dt=number){

		this.fauna.setVelocity(0);
		if(this.cursors.down.isDown){
			this.fauna.anims.play('fauna-run-down', true);
			this.fauna.setVelocityY(100);
		}
		else if(this.cursors.up.isDown){
			this.fauna.anims.play('fauna-run-up', true);
			this.fauna.setVelocityY(-100);
		}
		else if(this.cursors.left.isDown){
			this.fauna.anims.play('fauna-run-side', true);
			this.fauna.setVelocityX(-100);
			this.fauna.scaleX =- 1;
		}
		else if(this.cursors.right.isDown){
			this.fauna.anims.play('fauna-run-side', true);
			this.fauna.setVelocityX(100);
			this.fauna.scaleX = 1;
		}
		else{
			this.fauna.play('fauna-idle-down');
			this.fauna.setVelocity(0,0);
		}
	}
}