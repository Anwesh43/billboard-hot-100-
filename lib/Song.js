function Song(name,artist,rank,image) {
    this.name = name
    this.rank = rank
    this.artist = artist
    this.image = image
}

Song.prototype.getName = function() {
    return this.name
}
Song.prototype.getRank = function() {
    return this.rank
}
Song.prototype.getArtist = function() {
    return this.artist
}
Song.prototype.getImage = function() {
    return this.image
}
module.exports = Song
