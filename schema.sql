\connect songinfo

create table songlist (
  id SERIAL,
  plays integer,
  likes integer,
  reposts integer,
  description varchar(180),
  artist varchar(30),
  artistFollowers integer,
  artistTracks integer
);
