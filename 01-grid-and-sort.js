
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

        function create () {

            var blockSize = 100;
            var mainGroup = game.add.group();
            var blockGroup = game.add.group();
            
            for(var x=0; x<5; x++){
                for(var y=0; y<5; y++){
                    var block = game.make.sprite(0, 0, 'block');
                    blockGroup.add(block);
                }
            }
            blockGroup.align(5, 5, blockSize, blockSize, Phaser.CENTER);
            
            // nest the block group
            mainGroup.add(blockGroup);
            

            // now add the top sprite    
            var sprite = game.make.sprite(0, 0, 'phaser');
            mainGroup.add(sprite);
            
        }

    };
