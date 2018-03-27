(function(window){

    function game(settings){
        var _this = this;
        var currentLevel = 1;
        var gameBoard;
        this.isStarted = false;


        function start(){
            gameSetup(currentLevel || 1);
        }

        function gameOver(){
            alert('game over');
            _this.isStarted = false;
        }
        
        function win(){
            alert('You win!');
            _this.isStarted = false;
        }

        function gameSetup(level){
            if (gameBoard) {
                gameBoard.destroy();
            }
            
            gameBoard = new window.board(settings);
            gameBoard.create(level);
            _this.isStarted = true;
        }
        
        function setCurrentLevel(level){
            currentLevel = level;
        }

        this.start = start;
        this.gameOver = gameOver;
        this.setCurrentLevel = setCurrentLevel;
        this.win = win;
    }

    window.game = game;
})(window);