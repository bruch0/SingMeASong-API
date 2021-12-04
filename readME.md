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

</br>

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

</br>

### Get all musics by genre

````
GET /genres/:genreId

#### Possible response status

```bash
- 404: There is no musics for this genre is the genre does not exist
- 200: Success
````

</br>

## How to run in your machine 🖥️

```
git clone YOUR REPO LINK
```

```
cd YOUR REPO
```

```
npm i --force
```

Create a .env.dev file and fill it using your environment variables following <a href="YOUR .ENV.EXAMPLE LINK ON GITHUB">this example</a>

### In your terminal

```
sudo su postgres
```

```
psql
```

```
CREATE DATABASE YOUR DATABASE NAME
```

```
\c YOUR DATABASE NAME
```

Copy everything in the <a href="YOUR DUMP.SQL LINK ON GITHUB">dump.sql</a> file and paste on the terminal</br>
You can not exit the postgres admin, and run

```
npm run dev
```

</br>

## How to run the tests in your machine 🖥️

Create a .env.test file and fill it using your environment variables following <a href="YOUR .ENV.EXAMPLE LINK ON GITHUB">this example</a>

### In your terminal

```
sudo su postgres
```

```
psql
```

```
CREATE DATABASE YOUR DATABASE NAME_test;
```

```
\c YOUR DATABASE NAME_test
```

Copy everything in the <a href="YOUR DUMP.SQL LINK ON GITHUB">dump.sql</a> file and paste on the terminal</br>

You can not exit the postgres admin, and run

```
npm run test
```

</br>
  
  
## Deployment 🚀

<p align="center"><a  href="YOUR DEPLOYMENT LINK">You can check the server running on heroku here!</a></p>

</br>

### Contact

<div align="center">
  
  [![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:YOUR GMAIL)
  [![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](YOUR LINKEDIN ACCOUNT)
  
</div>
