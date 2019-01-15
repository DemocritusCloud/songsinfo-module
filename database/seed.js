const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);
const data = require('./dataGen.js');

const cn = 'postgresql://root:ht@localhost:5432/songinfo';
const db = pgp(cn);


console.log('Plays', data.Plays.length);
console.log('Likes', data.Likes.length);
console.log('Reposts', data.Reposts.length);
console.log('Desc', data.Desc.length);
console.log('Art', data.Art.length);
console.log('ArtFol', data.ArtFol.length);
console.log('ArtTra', data.ArtTra.length);

const cs = new pgp.helpers.ColumnSet(
  [
    'id',
    'plays',
    'likes',
    'reposts',
    'description',
    'artist',
    'artistfollowers',
    'artisttracks'
  ],
  {table: 'songlist'}
);



function getNextData(t, pageIndex) {
  let values;
  if (pageIndex < 1000) {
    values = [];
    for (let i = 1; i <= 10000; i++) {
      const index = pageIndex * 10000 + i;
      console.log('index is', index);
      values.push({
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
  }
  console.log('values', values);
  return Promise.resolve(values);
}

console.time('Seeding took');

console.log('db is', db);
db.tx('massive-insert', t => {
  return t.sequence(index => {
    return getNextData(t, index)
      .then(result => {
        if (result) {
          const insert = pgp.helpers.insert(result, cs);
          return t.none(insert);
        }
      });
  });
})
.then(() => {
  console.timeEnd('Seeding took');
  console.log('Finished');
})
.catch(error => {
  throw error;
})