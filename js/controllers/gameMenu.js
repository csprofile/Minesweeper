(function(window){
    function gameMenu(globalization){
        var actionMapReference;

        function setActionMapReference(){
            actionMapReference = {
                "newGame" : function(){
                    window.gameObject.start();
                },
                "gameSettings": function(a){
                    window.gameObject.setCurrentLevel(this.value);
                    window.gameObject.start();
                }
            }
        }

        function getActionMapReference(action){
            return actionMapReference[action];
        }

        function createMenu(gameMenuRes, container){
            setActionMapReference();

            for (key in gameMenuRes.data) {
                var menuItemElement = createItem(gameMenuRes.data[key]);
                container.appendChild(menuItemElement);
            }
        }

        function createItem(menuItem){
            var menuItemElement;
            var menuAction = getActionMapReference(menuItem.action);
            var globalizationId = menuItem.globalizationId;

            if (menuItem.options) {
                menuItemElement = document.createElement('select');
                menuItemElement.addEventListener("change", menuAction);
                
                for (var x = 0; x < menuItem.options.length; x++) {
                    var option = document.createElement('option');
                    option.setAttribute("data-globalization-id", menuItem.options[x].globalizationId);
                    option.setAttribute("class", "js_menuItem menu-item");
                    option.setAttribute("value", menuItem.options[x].id);
                    menuItemElement.appendChild(option);
                    globalization.addReadyElement(option);
                }

            } else {
                menuItemElement = document.createElement('button');
                menuItemElement.setAttribute("data-globalization-id", globalizationId);
                menuItemElement.setAttribute("class", "js_menuItem menu-item");
                menuItemElement.addEventListener('click', menuAction);

                globalization.addReadyElement(menuItemElement);
            }
            return menuItemElement;
        }

        this.createMenu = createMenu;
    }

    window.gameMenu = gameMenu;
})(window);