const faker = require('faker');
const Plays = [];
const Likes = [];
const Reposts = [];
const Desc = [];
const Art = [];
const ArtFol = [];
const ArtTra = [];

var numOfData = 10000000;

const rndGen = (type, arr) => {
  let rndData;
  for (let i = 0; i < numOfData; i++) {
    if (
      type === 'plays' ||
      type === 'likes' ||
      type === 'reposts' ||
      type === 'artistFollowers' ||
      type === 'artistTracks'
    ) {
      rndData = faker.random.number();
    }
    if (type === 'descriptions') {
      rndData = faker.lorem.sentence(3);
    }
    if (type === 'artists') {
      rndData = faker.internet.userName();
    }
    arr.push(rndData);
  }
};

rndGen('plays', Plays);
rndGen('likes', Likes);
rndGen('reposts', Reposts);
rndGen('artistFollowers', ArtFol);
rndGen('artistTracks', ArtTra);
rndGen('descriptions', Desc);
rndGen('artists', Art);

console.log('Finished generating data');

module.exports = {
  Plays,
  Likes,
  Reposts,
  ArtFol,
  ArtTra,
  Desc,
  Art
}