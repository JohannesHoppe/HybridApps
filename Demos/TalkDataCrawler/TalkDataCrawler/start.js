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

var saveStringify = function(obj) {
    return JSON.stringify(obj)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u??2029');
}

var writeFile = function (fileName, content) {
    fs.writeFile(fileName, content, 'utf8', console.log);
};

dwxCrawler = new DwxCrawler(crawlerConfig);
dwxCrawler.on('complete', function (talks, offlineElement) {

    console.log("Writing talks to disk!");

    writeFile(fileNameJson, saveStringify([offlineElement].concat(talks)));
    writeFile(fileNameJsonP, 'callback(' + saveStringify(talks) + ');');
});

dwxCrawler.start();
