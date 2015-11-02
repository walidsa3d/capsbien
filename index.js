var rq = require('request-promise');
var cheerio = require('cheerio');

var base_url = "http://www.cpasbien.pw";
var search = function(query, cb) {
    var search_query = encodeURIComponent(query);
    var search_url = base_url + "/recherche/" + search_query + ".html";
    console.log(search_url);
    var torrents = [];
    var options = {
        uri: search_url,
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    rq(search_url).then(function($) {
        if ($("div .ligne0").length > 0) {
            $("div[class^='ligne']").each(function(index, element) {
                var torrent = {};
                torrent.page = $(element).children("a").attr('href');
                torrent.title = $(element).children("a").text();
                torrent.size = $(element).children(".poid").text();
                torrent.seeds = $(element).find(".seed_ok").text();
                torrent.leech = $(element).find(".down").text();
                torrent.date_added = undefined;
                torrents.push(data_content);

            });
        }
        cb(torrents);

  });
};
