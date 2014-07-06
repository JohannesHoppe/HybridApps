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
        ]
    },
    fileNameJson = '../talks_fallback.json',
    fileNameJsonP = '../talks_callback.json';

dwxCrawler = new DwxCrawler(crawlerConfig);
dwxCrawler.on('complete', function (talks, offlineElement) {
    
    console.log("Writing talks to disk!");

    fs.writeFile(fileNameJson, JSON.stringify(talks), 'utf8', console.log);
    
    var talksJsonP = 'callback(' + JSON.stringify([offlineElement].concat(talks)) + ');';
    fs.writeFile(fileNameJsonP, talksJsonP, 'utf8', console.log);
});

dwxCrawler.start();
