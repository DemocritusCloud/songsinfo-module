const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);
const data = require('./dataGen.js');
// const db = require('./index.js');
var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/songinfo', {useNewUrlParser: true})
.then(() => {
  console.log("Connected");
})
.catch(err => console.log(err));

mongoose.connection.once('open', () => {
  mongoose.connection.collections.songList.drop((err) => {
    if (err) {
      console.log("Error dropping existing documents in songList");
    }
    if (!err) {
      console.log('Dropped existing documents in songList');
    }
  });
});

// Create schema
var songListSchema = new mongoose.Schema({
  id: Number,
  plays: Number,
  likes: Number,
  reposts: Number,
  description: String,
  artist: String,
  artistFollowers: Number,
  artistTracks: Number
});

// Compile schema into a model
var songList = mongoose.model('songList', songListSchema, 'songList');
var chunkSize = 10000;
var numOfChunks = 500;

console.time('Seeding took')
const insertData = (prevIndex) => {
  console.log('prevIndex', prevIndex);
  if (prevIndex < numOfChunks) {
    var songData = [];
    for(var i= 1; i <= chunkSize; i++) {
      var index = prevIndex * chunkSize + i;
      songData.push({
        id: index,
        plays: data.Plays[index-1],
        likes: data.Likes[index-1],
        reposts: data.Reposts[index-1],
        description: data.Desc[index-1],
        artist: data.Art[index-1],
        artistfollowers: data.ArtFol[index-1],
        artisttracks: data.ArtTra[index-1],
      });
    }
    console.log('Number of chunks added:', prevIndex);
    songList.insertMany(songData, () => {
      insertData(++prevIndex);
    });
    return;
  }
}

insertData(0);
console.timeEnd('Seeding took');
