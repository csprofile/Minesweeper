(function(window){

    function board(settings){
        var gameContainer = document.getElementById(settings.gameContainerDivId);
        var context = gameContainer.getContext("2d");
        var colorTranslation = window.colorTranslation;
        var tileSize = settings.tileSize;
        var gameEvents = new window.gameEvents(gameContainer, context, settings);

        function create(level){
            var totalBombs = 0;
            var eventsMap = new Array(); 
            var levelMap = window.levels[level];
            var levelSize = levelMap.board.length;

            if (levelMap.board.length < levelMap.board[0].length) {
                alert('Error: Level need to have the same width and height');
            }

            if (levelMap.randomBombs.enable) {
                levelMap = randomMap(levelMap);
            }

            for (var x = 0; x < levelSize ; x++) {
                eventsMap[x] = new Array();

                for (var y = 0; y < levelSize ; y++) {

                    var tile = colorTranslation[levelMap.board[y][x]];

                    context.beginPath();
                    context.rect(x*tileSize, y*tileSize, tileSize, tileSize);
                    context.fillStyle = tile[0];
                    context.fill();
                    context.lineWidth = 1;
                    context.strokeStyle = levelMap.boardStrokeColor;
                    context.stroke();
                    context.closePath();

                    var near = getNearby(levelMap.board, x, y);

                    eventsMap[x][y] = {
                        "bomb" : tile[1],
                        "x" : x * tileSize,
                        "y" : y * tileSize,
                        "w" : tileSize,
                        "h" : tileSize,
                        "fullPath" : near.path,
                        "qtyBomb" : near.qtyBomb,
                        "revealed" : false,
                        "emptyBlockColor" : levelMap.emptyBlockColor
                    }
                    
                    totalBombs += tile[1];

                }
            }

            gameEvents.bind(eventsMap, totalBombs, levelSize * levelSize);
        }
        
        function destroy(){
            context.clearRect(0, 0, gameContainer.width, gameContainer.height);
            gameEvents.unbind();
        }

        function getNearby(levelMap, x, y) {
            var path = new Array();
            var qtyBomb = 0;

            //Left
            if (levelMap[y] && levelMap[y][x + 1]) { 
                path.push([y, x + 1]);
                qtyBomb += colorTranslation[levelMap[y][x + 1]][1];
            }

            //Right
            if (levelMap[y] && levelMap[y][x - 1]) {
                path.push([y, x - 1]);
                qtyBomb += colorTranslation[levelMap[y][x - 1]][1];
            }

            //Top
            if (levelMap[y + 1] && levelMap[y + 1][x]) {
                path.push([y + 1, x]);
                qtyBomb += colorTranslation[levelMap[y + 1][x]][1];
            }

            //Bottom
            if (levelMap[y - 1] && levelMap[y - 1][x]) {
                path.push([y - 1, x]);
                qtyBomb += colorTranslation[levelMap[y - 1][x]][1];
            }

            //Top Left
            if (levelMap[y + 1] && levelMap[y + 1][x + 1]) {
                path.push([y + 1, x + 1]);
                qtyBomb += colorTranslation[levelMap[y + 1][x + 1]][1];
            }

            //Top Right
            if (levelMap[y + 1] && levelMap[y + 1][x - 1]) {
                path.push([y + 1, x - 1]);
                qtyBomb += colorTranslation[levelMap[y + 1][x - 1]][1];
            }

            //Bottom Left
            if (levelMap[y - 1] && levelMap[y - 1][x - 1]) {
                path.push([y - 1, x - 1]);
                qtyBomb += colorTranslation[levelMap[y - 1][x - 1]][1];
            }

            //Bottom Right
            if (levelMap[y - 1] && levelMap[y - 1][x + 1]) {
                path.push([y - 1, x + 1]);
                qtyBomb += colorTranslation[levelMap[y - 1][x + 1]][1];
            }

            return {
                path : path,
                qtyBomb, qtyBomb
            };
        }

        function randomMap(levelMap){
            var levelSize = levelMap.board.length;
            var randomBombs = new Array();

            var randomBombId = 0;

            for (var i = 0; i < levelSize * levelSize; i ++) {
                randomBombs[i] = i;
            }

            randomBombs.sort(function(a, b){return 0.5 - Math.random()});


            for (var x = 0; x < levelSize ; x++) {
                for (var y = 0; y < levelSize ; y++) {

                    if (randomBombs[randomBombId] < levelMap.randomBombs.qty) {
                        levelMap.board[y][x] = levelMap.board[y][x].toUpperCase();
                    } else {
                        levelMap.board[y][x] = levelMap.board[y][x].toLowerCase();
                    }

                    randomBombId ++;
                }
            }

            return levelMap;

        }

        this.create = create;
        this.destroy = destroy;
    }

    window.board = board;

})(window);