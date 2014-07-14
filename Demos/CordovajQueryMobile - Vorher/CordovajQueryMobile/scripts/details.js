(function (global) {
    
    $("#page-details").on('pagebeforeshow', function () {
                   
        var currentItem = JSON.parse(window.sessionStorage.getItem('currentItem'));
        
        if (currentItem) {

            $('#detail_title').text(currentItem.title);
            $('#detail_start').text(moment(currentItem.start).format('DD.MM.YYYY - HH:mm [Uhr]'));
            $('#detail_speaker').text(currentItem.speaker);
            $('#detail_track').text(currentItem.track);
            $('#detail_description').text(currentItem.description);
        }
    });

})(window);