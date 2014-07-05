﻿var util = require('util'),
    extend = require('extend'),
    events = require('events'),
    jsdom = require('jsdom'),
    jquery = require('jquery'),
    SimpleCrawler = require("simplecrawler");

function Crawler(config) {

    this.config = config;
    this.talks = [];

    this._crawler = new SimpleCrawler(this.config.host);
    extend(this._crawler, config);
    
    this._crawler.on("fetchcomplete", this._fetchcomplete.bind(this));
    this._crawler.on("complete", function () {
        this.emit('complete', this.talks);
    }.bind(this));

}

util.inherits(Crawler, events.EventEmitter);

Crawler.prototype._jQuerifyHtml = function(html) {
    
    var window = jsdom.jsdom(html, null, {
        FetchExternalResources: false,
        ProcessExternalResources: false,
        MutationEvents: false,
        QuerySelector: false
    }).createWindow();

    return jquery(window);
}

Crawler.prototype._isHtml = function(queueItem) {
    return queueItem.stateData.contentType.indexOf("text/html") !== -1;
}

Crawler.prototype._isEventPage = function (queueItem) {
    return queueItem.url.indexOf("event") !== -1;
}

// eg. "14.07.2014 11:45 - 12:45 Uhr"  
Crawler.prototype._reformatGermanDate = function (germanDate) {

    // example
    // var germanDate = "14.07.2014 11:45 - 12:45 Uhr";

    // 14.07.2014 11:45
    var fromDate = germanDate.split(" - ")[0];
    
    // ["14.07.2014", "11:45"]
    var date_and_time = fromDate.split(" ");
    
    // ["14", "07", "2014"]
    var date_parts = date_and_time[0].split(".");
    
    // ["11", "45"]
    var time_parts = date_and_time[1].split(":");

    var year = date_parts[2];
    var month = date_parts[1] - 1;
    var day = date_parts[0];
    var hour = time_parts[0];
    var minute = time_parts[1];
    var second = 0;

    var isoDate = new Date(year, month, day, hour, minute, second).toISOString();
    return isoDate;
}

Crawler.prototype._fetchcomplete = function(queueItem , responseBuffer , response) {

    console.log("Completed fetching resource:", queueItem.url);

    if (!this._isHtml(queueItem) ||
        !this._isEventPage(queueItem)) {
        return;
    }

    var html = responseBuffer.toString();
    var $ = this._jQuerifyHtml(html);

    var title = $(".container h2:first").text().trim();
    var description = $(".container p").text().trim();
    var time_and_track = $(".container .ezagenda_date").text().split("Track:");
    var germanDate = time_and_track[0].trim();     
    var track = time_and_track[1].trim();
    var isoDate = this._reformatGermanDate(germanDate);
    var speaker = $("h4").next().find("a").text().trim();

    if (!title || !date || date.indexOf("2014") == -1) {
        return;
    }

    this.talks.push({
        title: title,
        description: description,
        start: isoDate,
        track: track,
        speaker: speaker
    });
};

Crawler.prototype._fetcherror = function(queueItem, response) {
    console.log("Error fetching resource:", queueItem.url);
};

Crawler.prototype.start = function() {
    this._crawler.start();
};

module.exports = Crawler;