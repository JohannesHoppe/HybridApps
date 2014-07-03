/**
 * A qick & dirty crawler to get the events from DWX 2014
 *
 * Note: npm ncrawler will require you to install Python first (python-2.7.8 works fine)
 */

debugger;

var fs = require('fs'),
    Crawler = require("crawler").Crawler,
    config = {
        startNumber: 14107,
        endNumber: 14108,
        url: 'http://www.developer-week.de/Programm/Veranstaltung/(event)/',
        fileNameJson: 'talks_fallback.json',
        fileNameJsonP: 'talks_callback.json',
    },
    talks = [];

var crawlerCallback = function(error, result, $) {

debugger;

    var title = $(".container h2:first").text();
    var description = $(".container p").text();
    var date = $(".container .ezagenda_date").text();

    talks.push({
        title: title,
        description: description,
        date: date
    });
};

var crawlerOnDrain = function() {

    var talksJson = JSON.stringify(talks);
    var talksJsonP = 'callback(' + talksJson + ');';

    fs.writeFile(config.fileNameJson, talksJson, 'utf8', console.log);
    fs.writeFile(config.fileNameJsonP, talksJsonP, 'utf8', console.log);
};

var crawlerStart = function() {

    var crawler, urls = [],
        i = config.startNumber;

    while (i <= config.endNumber) {
        urls.push(config.url + ++i);
    }

    crawler = new Crawler({
        "maxConnections": 10,
        "callback": crawlerCallback,
        "onDrain": crawlerOnDrain
    });

    crawler.queue(urls);
};

crawlerStart();


setTimeout(function() {
        console.log("Test");
    },
    100000);