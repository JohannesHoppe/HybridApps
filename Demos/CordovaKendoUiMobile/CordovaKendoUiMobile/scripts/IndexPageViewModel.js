var IndexPageViewModel = function () {

    var viewModel = kendo.observable({
        talks: [],

        loadData: function() {

            getData().done(function (result) {
                viewModel.set("talks", result);
                app.detailsPageViewModel.setData(result[0]);
            });
        },

        showDetails: function(e) {

            app.detailsPageViewModel.setData(e.dataItem);
            app.application.navigate('#detailsPage', 'slide:left');
        }
    });

    return viewModel;
}