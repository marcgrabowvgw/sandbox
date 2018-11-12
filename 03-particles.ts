
    window.onload = function() {

        //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
        //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
        //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

        function preload () {

            game.load.baseURL = 'http://examples.phaser.io/assets/';
            game.load.crossOrigin = 'anonymous';

            game.load.image('particle', 'sprites/shinyball.png');

        }

        var emitter;

        async function create () {

            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = 0x337799;
        
            emitter = game.add.emitter(0, 0, 100);
        
            emitter.makeParticles('particle');
            emitter.gravity = 50;

            //emitter.width = 20;
            //emitter.height = 20;
            emitter.setAlpha(1, 0, 1800);

            (window as any).emitter = emitter;
        
            game.input.onDown.add(particleBurst, this);
        
            emitter.x = game.world.bounds.centerX;
            emitter.y = game.world.bounds.centerY;
            emitter.start(true, 2000, null, 10);

        }

        function particleBurst(pointer) {

            //  Position the emitter where the mouse/touch event was
            emitter.x = pointer.x;
            emitter.y = pointer.y;
        
            //  The first parameter sets the effect to "explode" which means all particles are emitted at once
            //  The second gives each particle a 2000ms lifespan
            //  The third is ignored when using burst/explode mode
            //  The final parameter (10) is how many particles will be emitted in this single burst
            emitter.start(true, 2000, null, 10);
        
        }
        
    };
