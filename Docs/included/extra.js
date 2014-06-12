var setTargets = function() {
    var link, i = 0;   
    while (link = document.links[i++]) {
        if (link.getAttribute('href').indexOf('http://') !== -1) {
            link.target = '_blank';
        }
    }
}

document.addEventListener("DOMContentLoaded", setTargets);