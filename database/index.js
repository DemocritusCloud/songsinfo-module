const Sequelize = require('sequelize');

// setup connection
const db = new Sequelize('songinfo', 'root', 'ht', {
  host: 'localhost',
  dialect: 'postgres'
});

// test connection
db.authenticate()
  .then(() => {
    console.log('Successfully connected to database.');
  })
  .catch(err => {
    console.log('Database connection was NOT succesful.', err);
  });

// songsinfo table schema
const SongsInfo = db.define(
  'songlist',
  {
    plays: Sequelize.INTEGER,
    likes: Sequelize.INTEGER,
    reposts: Sequelize.INTEGER,
    description: Sequelize.STRING,
    artist: Sequelize.STRING,
    artistFollowers: Sequelize.INTEGER,
    artistTracks: Sequelize.INTEGER
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

// applies SongsInfo table to democloud db
db.sync();

module.exports = { SongsInfo };
