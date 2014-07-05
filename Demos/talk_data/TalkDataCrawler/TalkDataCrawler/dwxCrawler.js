var util = require('util'),
    extend = require('extend'),
    events = require('events'),
    sdom = require('jsdom'),
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
 
    return jquery.create(window);
}

Crawler.prototype._isHtml = function(queueItem) {
    return queueItem.stateData.contentType.indexOf("text/html") !== -1;
}

Crawler.prototype._isEventPage = function (queueItem) {
    return queueItem.url.indexOf("event") !== -1;
}

Crawler.prototype._fetchcomplete = function(queueItem , responseBuffer , response) {

    console.log("Completed fetching resource:", queueItem.url);

    if (!this._isHtml(queueItem) || !this._isEventPage(queueItem)) {
        return;
    }
    
    /*
    var html = responseBuffer.toString();
    var $ = this._jQuerifyHtml(html);

    var title = $(".container h2:first").text();
    var description = $(".container p").text();
    var date = $(".container .ezagenda_date").text();

    if (!title || !date || date.indexOf("2014") == -1) {
        return;
    }

    this.talks.push({
        title: title,
        description: description,
        date: date
    });*/
};

Crawler.prototype._fetcherror = function(queueItem, response) {
    console.log("Error fetching resource:", queueItem.url);
};

Crawler.prototype.start = function() {
    this._crawler.start();
};

module.exports = Crawler;