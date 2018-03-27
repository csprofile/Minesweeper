(function(window){

    function uiEvents(canvasContext, settings){

        function blockReveal(block){
            block.revealed = true;

            canvasContext.beginPath();
            canvasContext.rect(block.x, block.y, block.w, block.h);
            canvasContext.fillStyle = block.emptyBlockColor;
            canvasContext.fill();
            canvasContext.lineWidth = 1;
            canvasContext.strokeStyle = settings.boardStrokeColor;
            canvasContext.globalAlpha = 1.0;
            canvasContext.stroke();
            canvasContext.closePath();
        }

        function blockSetQty(block){
            block.revealed = true;

            canvasContext.beginPath();
            canvasContext.rect(block.x, block.y, block.w, block.h);
            canvasContext.fillStyle = block.emptyBlockColor;
            canvasContext.fill();
            canvasContext.strokeText(block.qtyBomb.toString(),block.x + 7, block.y + 14);
            canvasContext.lineWidth = 1;
            canvasContext.strokeStyle = settings.boardStrokeColor;
            canvasContext.globalAlpha = 1.0;
            canvasContext.stroke();
            canvasContext.closePath();
        }

        function blockBomb(block){
            block.revealed = true;

            canvasContext.beginPath();
            canvasContext.rect(block.x, block.y, block.w, block.h);
            canvasContext.fillStyle = block.emptyBlockColor;
            canvasContext.fill();
            canvasContext.strokeText(String.fromCharCode("0164"),block.x + 7, block.y + 14);
            canvasContext.lineWidth = 1;
            canvasContext.strokeStyle = settings.boardStrokeColor;
            canvasContext.globalAlpha = 1.0;
            canvasContext.stroke();
            canvasContext.closePath();
        }

        this.blockReveal = blockReveal;
        this.blockSetQty = blockSetQty;
        this.blockBomb = blockBomb;
    }

    window.uiEvents = uiEvents;

})(window);