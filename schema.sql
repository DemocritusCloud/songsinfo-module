\connect songinfo

create table songlist (
  id integer,
  plays integer,
  likes integer,
  reposts integer,
  description varchar(180),
  artist varchar(30),
  artistFollowers integer,
  artistTracks integer
);

-- psql -U root songinfo <schema.sql