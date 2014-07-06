var IndexPageViewModel = function () {

    var viewModel = kendo.observable({
        notes: [],

        loadData: function() {

            getData().done(function (result) {
                viewModel.set("notes", result);

                var lastNote = viewModel.notes[viewModel.notes.length - 1];
                app.detailsPageViewModel.setData(lastNote);
            });
        },

        showDetails: function(e) {

            app.detailsPageViewModel.setData(e.dataItem);
            app.application.navigate('#detailsPage', 'slide:left');
        }
    });

    return viewModel;
}