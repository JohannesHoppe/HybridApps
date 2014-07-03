/**
 * A qick & dirty crawler to get the events from DWX 2014
 */

var Crawler = require("crawler").Crawler,
    config = {
        startNumber: 14107,
        endNumber: 15107,
        url: 'http://www.developer-week.de/Programm/Veranstaltung/(event)/'
    }
    urls = [],
    i = config.startNumber;

while (i <= endNumber) {
    urls.push(url + ++i);
}

var crawler = new Crawler({
    "maxConnections": 10,
    "callback": function(error, result, $) {

        var title = $(".container h2:first").text();
        var description = $(".container p").text();
        var date = $(".container .ezagenda_date").text();

    }
});

crawler.queue(urls);
