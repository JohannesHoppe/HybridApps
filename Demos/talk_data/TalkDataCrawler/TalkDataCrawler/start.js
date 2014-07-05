/**
 * A simple crawler to get the events from DWX 2014
 */

var fs = require('fs'),
    DwxCrawler = require('./dwxCrawler'), dwxCrawler,

    crawlerConfig = {
        host: 'www.developer-week.de',
        initialPath: '/Programm'
    },
    fileNameJson = 'talks_fallback.json',
    fileNameJsonP = 'talks_callback.json';

dwxCrawler = new DwxCrawler(crawlerConfig);
dwxCrawler.on('complete', function (talks) {

    var talksJson = JSON.stringify(talks);
    var talksJsonP = 'callback(' + talksJson + ');';

    fs.writeFile(fileNameJson, talksJson, 'utf8', console.log);
    fs.writeFile(fileNameJsonP, talksJsonP, 'utf8', console.log);
});

dwxCrawler.start();
