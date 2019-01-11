const faker = require('faker');
const db = require('./index.js');

const rndPlays = [];
const rndLikes = [];
const rndReposts = [];
const rndDesc = [];
const rndArt = [];
const rndArtFol = [];
const rndArtTra = [];

const rndGen = (type, arr) => {
  let rndData;
  for (let i = 0; i <= 99; i++) {
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
      rndData = faker.lorem.sentence();
    }
    if (type === 'artists') {
      rndData = faker.internet.userName();
    }
    arr.push(rndData);
  }
};

rndGen('plays', rndPlays);
rndGen('likes', rndLikes);
rndGen('reposts', rndReposts);
rndGen('artistFollowers', rndArtFol);
rndGen('artistTracks', rndArtTra);
rndGen('descriptions', rndDesc);
rndGen('artists', rndArt);


for (let i = 0; i <= 99; i++) {
  db.SongsInfo.create({
    plays: rndPlays[i],
    likes: rndLikes[i],
    reposts: rndReposts[i],
    description: rndDesc[i],
    artist: rndArt[i],
    artistfollowers: rndArtFol[i],
    artisttracks: rndArtTra[i]
  });
}
