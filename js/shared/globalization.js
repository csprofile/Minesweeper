(function(window){
    var globalizatedElements = new Array();

    function globalization(globalizationRes, defAppSettingsRes){
        function addReadyElement(element){
            var globalizationId = element.getAttribute("data-globalization-id");
            translateElement(element, globalizationId, defAppSettingsRes.defaultCulture);
            
            globalizatedElements[globalizationId] = element;
        }

        function translateElement(element, globalizationId, culture){
            var text = globalizationRes[globalizationId][culture];
            element.innerHTML = text;
        }
        
        function translateAllElements(culture){
            for (key in globalizatedElements) {
                var element = globalizatedElements[key];
                var globalizationId = element.getAttribute("data-globalization-id");
                var text = globalizationRes[globalizationId][culture];
                element.innerHTML = text;
            }
        }
        
        this.addReadyElement = addReadyElement;
        this.translateAllElements = translateAllElements;
    }
    
    window.globalization = globalization;
})(window);