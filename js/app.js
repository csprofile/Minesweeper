(function(window){
    
    function app(){
        function load(){
            const loader = new PIXI.loaders.Loader();
            loader
                .add('globalization', 'assets/data/globalization.json')
                .add('gameMenu', 'assets/data/gameMenu.json')
                .add('defAppSettings', 'assets/data/defaultAppSettings.json')
                .add('levels', 'assets/data/levels.json')
                .add("colorTranslation", 'assets/data/colorTranslation.json');
            
            loader.load((loader, res) => {
                window.levels = res.levels.data;
                window.colorTranslation = res.colorTranslation.data;
                
                var settings = res.defAppSettings.data;
                var globalization = new window.globalization(res.globalization.data, settings);
                
                var gameMenuContainer = document.getElementById(settings.gameMenuDivId);
                
                var gameMenu = new window.gameMenu(globalization);
                window.gameObject = new window.game(settings);
                
                gameMenu.createMenu(res.gameMenu, gameMenuContainer);
            });
        }

        this.load = load;
    }
    
    window.app = app;
})(window);