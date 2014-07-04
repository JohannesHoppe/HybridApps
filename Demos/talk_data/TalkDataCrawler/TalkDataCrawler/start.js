/**
 * A simple crawler to get the events from DWX 2014
 */

var fs = require('fs'),
    DwxCrawler = require('./dwxCrawler'), dwxCrawler,
    saveTalksToDisk,

    config = {
        url: 'http://www.developer-week.de/Programm',
        fileNameJson: 'talks_fallback.json',
        fileNameJsonP: 'talks_callback.json',
    };

dwxCrawler = new DwxCrawler();
dwxCrawler.crawlerStart(function(talks) {

    var talksJson = JSON.stringify(talks);
    var talksJsonP = 'callback(' + talksJson + ');';

    fs.writeFile(config.fileNameJson, talksJson, 'utf8', console.log);
    fs.writeFile(config.fileNameJsonP, talksJsonP, 'utf8', console.log);
});