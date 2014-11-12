(function (global) {
    var app = global.app = global.app || {};

    document.addEventListener("deviceready", function() {

        app.indexPageViewModel = {}
        
        // kendo.mobile.Application internally calls kendo.bind
        app.application = new kendo.mobile.Application($(document.body), { layout: "tabstrip-layout" });

        //app.application.skin("flat");
        app.application.skin("");

    }, false);

})(window);