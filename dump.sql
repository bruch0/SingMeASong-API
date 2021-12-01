CREATE TABLE "public.genres" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "genres_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public.musics" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL,
	CONSTRAINT "musics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public.music genres" (
	"id" serial NOT NULL,
	"music_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	CONSTRAINT "music genres_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public.music_ratings" (
	"id" serial NOT NULL,
	"music_id" integer NOT NULL,
	"rating" integer NOT NULL,
	CONSTRAINT "music_ratings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "music genres" ADD CONSTRAINT "music genres_fk0" FOREIGN KEY ("music_id") REFERENCES "musics"("id");

ALTER TABLE "music genres" ADD CONSTRAINT "music genres_fk1" FOREIGN KEY ("genre_id") REFERENCES "genres"("id");

ALTER TABLE "music_ratings" ADD CONSTRAINT "music_ratings_fk0" FOREIGN KEY ("music_id") REFERENCES "musics"("id");
