CREATE TABLE "genres" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "genres_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "musics" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "musics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "music_genres" (
	"id" serial NOT NULL,
	"music_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	CONSTRAINT "music genres_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "music_genres" ADD CONSTRAINT "music_genres_fk0" FOREIGN KEY ("music_id") REFERENCES "musics"("id");

ALTER TABLE "music_genres" ADD CONSTRAINT "music_genres_fk1" FOREIGN KEY ("genre_id") REFERENCES "genres"("id");
