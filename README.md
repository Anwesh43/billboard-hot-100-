#billboard-hot-100

##Synopsis

Simple api to fetch hot 100 song details

##Description

The api fetches hot 100 song details like name,artist,rank and image url from billboard.com. The main method is init which returns a promise so you will get a object having all the songs when the promise is successful and you can catch error if any

###How it looks

```
  var BillBoard = require('billboard-hot-100')
  BillBoard.init().then(function(billboard){
      var songs = billboard.getAllSongs()
      var numberOneSong = billboard.getSongAt(0)
  }).catch(function(err){
      console.log(err)
  })
```

###To Install
```
    npm install --save billboard-hot-100
```
