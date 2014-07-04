var jsdom = require('jsdom'),
    jquery = require('jquery'),
    crawler = require("simplecrawler"),
    Crawler;

Crawler = function(completeCallback) {

    this.talks = [];
    this.completeCallback = completeCallback;
}

Crawler.prototype._jQuerifyHtml = function(html) {
    
    var window = jsdom.jsdom(html, null, {
        FetchExternalResources: false,
        ProcessExternalResources: false,
        MutationEvents: false,
        QuerySelector: false
    }).createWindow();
 
    return jquery.create(window);
}

Crawler.prototype._fetchcomplete = function(queueItem , responseBuffer , response) {

    console.log("Completed fetching resource:", queueItem.url);

    if (queueItem.url.indexOf("(event)") == -1) {
        return;
    }

    var $ = this._jQuerifyHtml(response);

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
    });
};

Crawler.prototype.crawlerStart = function() {

    crawler.crawl(config.url)
        .on("fetchcomplete", this._fetchcomplete.bind(this))
        .on("complete", function() {
            this.completeCallback(this.talks);
        }.bind(this));

};

module.exports = Crawler;