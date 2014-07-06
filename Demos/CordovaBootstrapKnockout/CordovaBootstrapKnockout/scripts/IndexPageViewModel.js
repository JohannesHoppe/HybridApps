var IndexPageViewModel = (function (ko) {

    var IndexPageViewModel = function () {

        var self = this;

        self.talks = ko.observableArray();
        self.selectedNote = ko.observable(false);

        self.loadData = function () {

            self.talks.removeAll();
            getData().done(function(result) {
                self.talks = ko.mapping.fromJS(result, {}, self.talks);
            });
        };

        self.showDetails = function (current) {
            self.selectedNote(current);
        };

        self.showHome = function() {
            self.selectedNote(false);
        };
    };

    return IndexPageViewModel;
    
})(window.ko);