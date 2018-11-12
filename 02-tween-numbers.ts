

    window.onload = function() {

        //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
        //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
        //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

        function preload () {

            game.load.baseURL = 'http://examples.phaser.io/assets/';
            game.load.crossOrigin = 'anonymous';

            game.load.image('phaser', 'sprites/phaser-dude.png');
            game.load.image('block', 'sprites/block.png');

        }

        const addSpeed = 750;

        async function create () {

            const container = new NumberContainer();

            while(true){
 
                container.addBall();
                await sleep(addSpeed);
            }

        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        class NumberContainer {

            balls = [];
            animSpeed = 500;

            addBall(){

                // mvoe all existing balls to the side
                this.moveBalls();

                if(this.balls.length>3){
                    this.fadeOutLastBall();
                }

                // create a new one
                var sprite = game.add.sprite(100, 25, 'block');
    
                this.balls.push(sprite);

                sprite.anchor.setTo(0.5, 0.5);
                sprite.alpha = 0;
                sprite.scale.x = 0;
                sprite.scale.y = 0;

                // fade it in
                var g = game.add.tween(sprite).to( { alpha: 1, y: 100 }, this.animSpeed, Phaser.Easing.Linear.None, true);
                game.add.tween(sprite.scale).to( { x: 1, y: 1 }, this.animSpeed, Phaser.Easing.Linear.None, true);

            }

            moveBalls() {

                for (let i = 0; i < this.balls.length; i++) {
                    const element = this.balls[i];
                    game.add.tween(element).to( { x: element.x + 100 }, this.animSpeed, Phaser.Easing.Linear.None, true);
                }

            }

            fadeOutLastBall() {

                const ball = this.balls[0];
                this.balls.splice(0, 1);
                var g = game.add.tween(ball).to( { alpha: 0, y: 150 }, this.animSpeed, Phaser.Easing.Linear.None, true);
                game.add.tween(ball.scale).to( { x: 0, y: 0 }, this.animSpeed, Phaser.Easing.Linear.None, true);
                //console.log(g);
                g.onComplete.add((obj, tween) => {
                    obj.destroy();
                });
            }

    

        }

    };
