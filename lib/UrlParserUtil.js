var parserUtil = {}
var cheerio = require('cheerio')
var Constants = require('./Constants')
var request = require('request')
var q = require('q')
parserUtil.fetchUrl = function() {
    var defer = q.defer()
    request(Constants.BILLBOARD_URL,function(err,data){
        if(err == null) {
            defer.resolve(data.body)
        }
        else {
            defer.reject(err)
        }
    })
    return defer.promise
}
parserUtil.parseDivsForSong = function() {
    var songs = []
    var defer = q.defer()
    this.fetchUrl().then(function(data){

        var $ = cheerio.load(data)
        var divs = $(Constants.MAIN_CLASS).find(Constants.SONG_DIV)
        $(divs).each((index,div)=>{
            var name = $(div).find(Constants.SONG_NAME).html().replace("&amp;","&").replace("&apos;","'")
            var artist = $(div).find(Constants.SONG_ARTIST).html().replace("&amp;","&").replace("&apos;","'")
            var rank = $(div).find(Constants.SONG_RANK).html()
            var imageDiv = $(div).find(Constants.SONG_IMAGE)
            var image = $(imageDiv).css('background-image')
            if(image == undefined) {
                image = $(imageDiv).attr('data-imagesrc')
            }
            else {
                image = image.replace("url(","").replace(")","")
            }
          
            songs.push({name:name,artist:artist,rank:rank,image:image}) //could have also written as {name,artist,rank,image}

            if(songs.length == 100) {
                defer.resolve(songs)
            }
        })
    }).catch(function(err){
        console.log(err)
        defer.reject(err)
    })
    return defer.promise
}
module.exports = parserUtil
