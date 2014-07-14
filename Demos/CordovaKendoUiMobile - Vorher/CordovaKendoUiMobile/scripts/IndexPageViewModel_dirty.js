
var viewModel = kendo.observable({
    talks: [],

    loadData: function() {

        getData().done(function(result) {
            viewModel.set("talks", result);
        });
    }
});