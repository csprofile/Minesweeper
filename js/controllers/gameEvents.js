(function(window){

    function gameEvents(gameContainer, canvasContext, settings){
        var uiEvents = new window.uiEvents(canvasContext, settings);
        var totalTiles = 0;

        function bind(eventsMap, totalBombs, levelSize){
            //revealAll(eventsMap);
            gameContainer.addEventListener('click', function(e) {
                if (window.gameObject.isStarted) {
                    var rect = collides(eventsMap, e.offsetX, e.offsetY);
                    if (rect) {
                        if (rect.bomb > 0) {
                            revealAllBombs(eventsMap);
                            window.gameObject.gameOver();
                        } else if (rect.qtyBomb > 0) {
                            uiEvents.blockSetQty(rect);
                            totalTiles ++;
                        } else {
                            pathWalk(rect.fullPath, eventsMap);
                        }
                        
                        winCheck(levelSize - totalBombs);
                    }
                }
            }, false);
        }

        function unbind(){
            var oldEl = gameContainer;
            var newEl = oldEl.cloneNode(true);
            oldEl.parentNode.replaceChild(newEl, oldEl);
        }
        
        function winCheck(totalActiveTiles){
            if (totalTiles == totalActiveTiles) {
                window.gameObject.win();
            }
        }

        function pathWalk(fullPath, eventsMap){
            for (var x = 0; x < fullPath.length; x ++) {
                var posX = fullPath[x][0];
                var posY = fullPath[x][1];

                if (eventsMap[posY][posX].bomb == 0 && !eventsMap[posY][posX].revealed) {

                    if (eventsMap[posY][posX].qtyBomb == 0) {
                        totalTiles++;
                        uiEvents.blockReveal(eventsMap[posY][posX]);
                        pathWalk(eventsMap[posY][posX].fullPath, eventsMap);
                    } else {
                        totalTiles++;
                        uiEvents.blockSetQty(eventsMap[posY][posX]);
                    }

                }
            }
        }

        function revealAll(eventsMap){
            for (var xAxis = 0 ; xAxis < eventsMap.length; xAxis++) {
                for (var yAxis = 0; yAxis < eventsMap[xAxis].length; yAxis++) {
                    if (eventsMap[xAxis][yAxis].bomb == 1) {
                        uiEvents.blockBomb(eventsMap[xAxis][yAxis]);
                    } else if (eventsMap[xAxis][yAxis].qtyBomb > 0) {
                        uiEvents.blockSetQty(eventsMap[xAxis][yAxis]);
                    } else {
                        uiEvents.blockReveal(eventsMap[xAxis][yAxis]);
                    }
                }
            }
        }

        function revealAllBombs(eventsMap){
            for (var xAxis = 0 ; xAxis < eventsMap.length; xAxis++) {
                for (var yAxis = 0; yAxis < eventsMap[xAxis].length; yAxis++) {
                    if (eventsMap[xAxis][yAxis].bomb == 1) {
                        uiEvents.blockBomb(eventsMap[xAxis][yAxis]);
                    }
                }
            }
        }

        function collides(eventsMap, x, y) {
            var isCollision = false;
            for (var xAxis = 0 ; xAxis < eventsMap.length; xAxis++) {
                for (var yAxis = 0; yAxis < eventsMap[xAxis].length; yAxis++) {
                    var left = eventsMap[xAxis][yAxis].x;
                    var right = eventsMap[xAxis][yAxis].x + eventsMap[xAxis][yAxis].w;
                    var top = eventsMap[xAxis][yAxis].y;
                    var bottom = eventsMap[xAxis][yAxis].y + eventsMap[xAxis][yAxis].h;

                    if (right >= x
                        && left <= x
                        && bottom >= y
                        && top <= y) {
                        isCollision = eventsMap[xAxis][yAxis];
                    }
                }
            }
            return isCollision;
        }

        this.bind = bind;
        this.unbind = unbind;
    }

    window.gameEvents = gameEvents;

})(window);