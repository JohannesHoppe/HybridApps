/**
 * A simple crawler to get the events from DWX 2014
 */

var fs = require('fs'),
    DwxCrawler = require('./dwxCrawler'),
    dwxCrawler,

    crawlerConfig = {
        host: 'www.developer-week.de',
        initialPath: '/Programm',
        discoverRegex: [
            /(\shref\s?=\s?)['"](\/Programm\/Veranstaltung\/\(event\)\/[^"']+)/ig
        ],
        userAgent: 'DWX 2014 TalkDataCrawler (by Johannes Hoppe)'
    },
    fileNameJson = '../talks_fallback.json',
    fileNameJsonP = '../talks_callback.json';

var writeFile = function(fileName, content) {
    //var utf8Bom = '\ufeff';
    var utf8Bom = '';
    fs.writeFile(fileName, utf8Bom + content, 'utf8', console.log);
};

dwxCrawler = new DwxCrawler(crawlerConfig);
dwxCrawler.on('complete', function (talks, offlineElement) {

    console.log("Writing talks to disk!");

    writeFile(fileNameJson, JSON.stringify([offlineElement].concat(talks)));
    writeFile(fileNameJsonP, 'callback(' + JSON.stringify(talks) + ');');
});

dwxCrawler.start();
