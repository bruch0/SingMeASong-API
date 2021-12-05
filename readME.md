# Sing Me A Song API

## Documentation 🧾

### Get genres

```
GET /genres
```

#### Possible response status

```bash
- 404: There are no genres registered
- 200: Success
```

#### What you will receive from this route

```jsx
[
  {
    id: genreId,
    name: genreName,
  },
];
```

---

### Create genre

```
POST /genres
```

#### Expected body

```jsx
{
  name: String, at least 3 characters, maximum 20 characters
}
```

#### Possible response status

```bash
- 400: Your genre name is invalid
- 409: This genre is already registered
- 201: Success
```

---

### Get all musics by genre

```
GET /genres/:genreId
```

#### Possible response status

```bash
- 404: There is no musics for this genre is the genre does not exist
- 200: Success
````

#### What you will receive from this route

```jsx
{
  "id": genreId,
  "name": genreName,
  "score": totalGenreScore,
  "recommendations": 
    [
      {
        "id": recommendationId,
        "name": recommendationName,
        "genres": 
	  [
            {
              "id": genreId
              "name": genreName,
            },
          ],
        "youtubeLink": recommendationLink,
        "score": recommendationScore
      },
    ]
}
```

---

### Get recommendation

```
GET /recommendation/random
```

#### Possible response status

```bash
- 404: There are no musics registered
- 200: Success
```

#### What you will receive from this route

```jsx
{
  "id": recommendationId,
  "name": recommendationName,
  "genres": 
    [
      {
        "id": genreId
        "name": genreName,
      },
    ],
  "youtubeLink": recommendationLink,
  "score": recommendationScore
}
```

---

### Get top songs

```
GET /recommendation/top/:amount
```

#### Possible response status

```bash
- 400: You have not sent a amount or a smaller than 1
- 200: Success
```

#### What you will receive from this route

```jsx
[
  {
    "id": recommendationId,
    "name": recommendationName,
    "genres": 
      [
        {
          "id": genreId
          "name": genreName,
        },
      ],
    "youtubeLink": recommendationLink,
    "score": recommendationScore
  },
]
```

---

### Get recommendation by genre

```
GET /recommendation/genres/:genreId/random
```

#### Possible response status

```bash
- 400: Invalid genreId
- 404: The genre does not exist
- 200: Success
```

#### What you will receive from this route

```jsx
{
  "id": recommendationId,
  "name": recommendationName,
  "genres": 
    [
      {
        "id": genreId
	"name": genreName,
      },
    ],
  "youtubeLink": recommendationLink,
  "score": recommendationScore
}
```

---

### Recommend song

```
POST /recommendations
```

#### Expected body

```jsx
{
  name: String, at least 3 characters, maximum 30 characters,
  genresId: Array, at least one genre must be listed,
  youtubeLink: String, must be a valid youtube link
}
```

#### Possible response status

```bash
- 400: You have sent a invalid body, check your params
- 409: This music is already been recommended
- 404: A genre you listed does not exist
- 201: Success
```

---

### Upvote song

```
POST /recommendations/:recommendationId/upvote
```

#### Possible response status

```bash
- 400: You have sent a invalid id
- 404: The recommendation does not exist
- 200: Success
```

---

### Downvote song

```
POST /recommendations/:recommendationId/downvote
```

#### Possible response status

```bash
- 400: You have sent a invalid id
- 404: The recommendation does not exist
- 200: Success
```

---

## How to run in your machine 🖥️

```
git clone https://github.com/bruch0/SingMeASong-API.git
```

```
cd SingMeASong-API
```

```
npm i --force
```

Create a .env.dev file and fill it using your environment variables following <a href="https://github.com/bruch0/SingMeASong-API/blob/main/.env.example">this example</a>

### In your terminal

```
sudo su postgres
```

```
psql
```

```
CREATE DATABASE singmeasong
```

```
\c singmeasong
```

Copy everything in the <a href="https://github.com/bruch0/SingMeASong-API/blob/main/dump.sql">dump.sql</a> file and paste on the terminal</br>
You can not exit the postgres admin, and run

```
npm run start:dev
```

</br>

## How to run the tests in your machine 🖥️

Create a .env.test file and fill it using your environment variables following <a href="https://github.com/bruch0/SingMeASong-API/blob/main/.env.example">this example</a>

### In your terminal

```
sudo su postgres
```

```
psql
```

```
CREATE DATABASE singmeasong_test;
```

```
\c singmeasong_test
```

Copy everything in the <a href="https://github.com/bruch0/SingMeASong-API/blob/main/dump.sql">dump.sql</a> file and paste on the terminal</br>

You can not exit the postgres admin, and run

```
npm run test
```

</br>
  
  
## Deployment 🚀

<p align="center"><a  href="https://sing-me-one-song.herokuapp.com/">You can check the server running on heroku here!</a></p>

</br>

### Contact

<div align="center">
  
  [![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lucas.bruch0@gmail.com)
  [![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-bruch/)
  
</div>
