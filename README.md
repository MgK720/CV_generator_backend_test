# CV Generator
## _Make your cv and share it to employer_

CV Generator is simple web tool for making cv. <br />
It has built in TalentFinder - as a employer you can find talented people.

## Features
- Create account and login to portal
- Create your own CV 
- Upload your Image
- Update and Delete your CV whenever you want
- Use TalentFinder for searching another persons CVs
- Mobile devices compatibility (Resposnsive Web Design)

_Everything on a simple web page_ <br />
_**Watch (TODO )[App Overview][overwiev] (TODO) video**_

## Creator Note

> This is a simple project made for learning purposes.
> With this project i wanted to learn web developer
> "tools" like javascript, sql and node.js.
> Styles are realy basic.
> CV Generator concept is just a random idea.
> At first i made schema for my project and some
> features wasn't easy to implement for me.
> I made some coding problems which ones at first look i cant resolve.
> And then i tried to resolve them.
> My app still have some problems like "phone numbers", actually 
> it accepts only 3 digits country code and 9 digits numbers.
> But to resolve this with good rules like validation and store
> on database i need to use someone's phone patterns datalists etc..
> And this is not main goal for this project.
> I wanted to make everything from scratch.

## Overview
_TODO content and gifs..._

## Tech

CV Generator uses this techs:
- **HTML5**
- **CSS3**
- **JavaScript**
  - jQuery
  - Axios
- **PostgreSQL**
- **Node.js**
  - Express
  - Multer
  - pg
  - EJS 
  - passport
  - bcrypt
  - and more ..

CV Generator is open source with a [public repository][repo] on GitHub.  <br />
And another [repository][repo_test] for my tests.

## Installation

_TODO_

```sh
cd cv_generator
npm i
touch .env #[*]
mkdir public/imgs
node server.js
```

### Database Configuration [*]
Create database and launch files: 
```sh
./database/db/create_db.sql
./database/db/pre_insert.sql
./database/db/trigger.sql
```
In .env file configure your connection to database.
```sh
DB_HOST = "localhost"
DB_USER = "user"
DB_DATABASE = "database"
DB_PASSWORD = 'password'
DB_PORT = 5432
```

To drop database content launch:
```sh
./database/db/drop_db.sql
```
## Directory Tree
| Directory | Content |
| ------ | ------ |
| ./ | server.js (main file), package.json, .gitignore, .env |
| ./api | backend CRUD |
| ./api/login_register | backend Authentication and Authorization |
| ./database | database info and .sql files |
| ./public | frontend .js and .css files |
| ./public/scripts | cv form "_logic_" |
| ./seeds | seeds in js objects format |
| ./seeds/imgs | images seeds in .jpg files |
| ./thunder | postman/thunder tests |
| ./*tests* | TODO  |
| ./views | templates (.ejs files) |


## Docker

_TODO_

## License

_TODO_
Open Source



   [repo]: <https://github.com/MgK720/CV_generator>
   [repo_test]: <https://github.com/MgK720/CV_generator_backend_test>
   [overwiev]: <youtube.com>
