export class Game extends Phaser.Scene{

    constructor() {
        super({key: 'game'});
    }

    preload() {
        this.load.image('background', './assets/background.jpg');
        this.load.spritesheet('bird', './assets/bird.png', {frameWidth: 80, frameHeight: 65});
        this.load.image('lollipopUp', './assets/lollipop.png');
        this.load.image('lollipopDown', './assets/lollipopDown.png');
    }

    create() {
        this.add.sprite(630, 315, 'background');

        this.player = this.physics.add.sprite(50, 100, 'bird');

        this.anims.create({
			key: 'volar',
			frames: this.anims.generateFrameNumbers('bird', {start: 1, end: 0}),
			frameRate: 2,
			repeat: 0,
		});

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === 32) {
                this.player.play('volar');
                this.fly();  
            }
        });
        this.newPipe();

        this.physics.world.on('worldbounds', (body) => {
            this.scene.start('gameOver');
        });
    
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
    }

    newPipe() {

        const pipe = this.physics.add.group();
        const hueco = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < 8; i++) {
            if (i !== hueco && i !== hueco + 1 && i !== hueco - 1) {
                const cubo = pipe.create(1600, i * 92, 'lollipopUp');
                cubo.body.allowGravity = false;
            }
        }
        pipe.setVelocityX(-200);

        pipe.checkWorldBounds = true;

        pipe.outOfBoundsKill = true;

        this.time.delayedCall(1800, this.newPipe, [], this);

        this.physics.add.overlap(this.player, pipe, this.hitColumna, null, this);
    }

    hitColumna() {
        this.scene.start('gameOver');
    }
    
    fly() {
        this.player.setVelocityY(-195);
        this.input.on('pointerdown', () => this.fly());
    }
}

export class GameOver extends Phaser.Scene{

    constructor(){
        super('gameOver');
    }

    preload(){
        this.load.image('background end', './assets/gameOver.png');
    }

    create(){
        this.add.sprite(630, 315, 'background end');
        this.input.on('pointerdown', () => this.restart())
    }

    restart(){
        this.scene.start('game');
    }
}
