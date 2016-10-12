var songFactory = require('./SongFactory')
var q = require('q')
function BillBoard(songs) {
    this.songs = songs
}
BillBoard.prototype.getAllSongs = function() {
    return this.songs
}
BillBoard.prototype.getSongAt = function(index) {
    return this.songs[index]
}
BillBoard.init = function() {
    var defer = q.defer()
    songFactory.fetchSongsFromUrl().then(function(songs){
        defer.resolve(new BillBoard(songs))
    }.bind(this)).catch(function(err){
        console.log(err)
        defer.reject(err)
    })
    return defer.promise
}
module.exports = BillBoard
