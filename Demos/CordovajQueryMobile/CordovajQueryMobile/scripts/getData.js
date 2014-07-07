var getData = function () {

    var url = 'http://johanneshoppe.github.io/HybridApps/Demos/TalkDataCrawler/talks_callback.json';
    var urlFallback = 'scripts/talks_fallback.json';

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }

    var filterData = function (data) {

        var i = data.length,
            minDate = addMinutes(new Date(), -30);

        while (i--) {
            if (minDate > new Date(data[i].start) &&
                data.title != "OFFLINE") {
                data.splice(i, 1);
            } 
        }
    }

    var request = $.Deferred(function (deferred) {

        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            timeout: 2000,
        })
        .done(function (data, textStatus, jqXHR) {
            filterData(data);
            deferred.resolveWith(this, [data, textStatus, jqXHR]);
        })
        .fail(function (jqXHR, textStatus) {

            jQuery.getJSON(urlFallback, function (data) {
                filterData(data);
                deferred.resolveWith(this, [data, textStatus, jqXHR]);
            });

        });
    }).promise();

    return request;
}