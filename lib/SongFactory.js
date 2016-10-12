var SongFactory = {}
var q = require('q')
var parserUtil = require('./UrlParserUtil')
var Song = require('./Song')
SongFactory.fetchSongsFromUrl = function() {
    var defer = q.defer()
    parserUtil.parseDivsForSong().then(function(songs){
          songs = songs.map(function(song){
            return new Song(song.name,song.artist,song.rank,song.image)
          })
          defer.resolve(songs)
    }).catch((err)=>{
        defer.reject(err)
    })
    return defer.promise
}
module.exports = SongFactory
