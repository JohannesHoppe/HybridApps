var DetailsPageViewModel = function () {

    var viewModel = kendo.observable({
        
        title: '',
        start: '',
        description: '',
        speaker: '',
        track: '',

        setData: function(data) {

            viewModel.set('title', data.title);
            viewModel.set('start', moment(data.start).format('DD.MM.YYYY - HH:mm [Uhr]'));
            viewModel.set('description', data.description);
            viewModel.set('speaker', data.speaker);
            viewModel.set('track', data.track);

        }
    });

    return viewModel;
}