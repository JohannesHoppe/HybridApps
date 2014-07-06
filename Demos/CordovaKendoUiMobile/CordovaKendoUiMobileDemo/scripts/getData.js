var getData = function () {

    var url = 'http://johanneshoppe.github.io/HybridApps/Demos/TalkDataCrawler/talks_callback.json';
    var urlFallback = 'scripts/talks_fallback.json';

    var request = $.Deferred(function (deferred) {

        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            timeout: 2000,
        })
        .done(function (data, textStatus, jqXHR) {
            deferred.resolveWith(this, [data, textStatus, jqXHR]);
        })
        .fail(function (jqXHR, textStatus) {

            jQuery.getJSON(urlFallback, function (data) {
                deferred.resolveWith(this, [data, textStatus, jqXHR]);
            });

        });
    }).promise();

    return request;
}