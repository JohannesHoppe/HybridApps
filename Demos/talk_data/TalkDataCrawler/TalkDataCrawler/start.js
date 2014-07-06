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
    fileNameJson = 'talks_fallback.json',
    fileNameJsonP = 'talks_callback.json';

dwxCrawler = new DwxCrawler(crawlerConfig);
dwxCrawler.on('complete', function (talks) {
    
    console.log("Writing talks to disk!");

    var talksJson = JSON.stringify(talks);
    var talksJsonP = 'callback(' + talksJson + ');';

    fs.writeFile(fileNameJson, talksJson, 'utf8', console.log);
    fs.writeFile(fileNameJsonP, talksJsonP, 'utf8', console.log);
});

dwxCrawler.start();
