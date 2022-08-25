# Web Authentication (Session Based) using Node JS, Express JS, and PostgreSQL

Basic Configuration

.env variable

create .env file in your root project directory.

# database
DB_USER= 'rizki'
DB_HOST= 'localhost'
DB_DATABASE= 'env'
DB_PASSWORD= '@Jakarta_16'
DB_POST= '5432'

# session storage
SESSION_NAME = 'rizkifajar'
SESSION_SECRET = 'secret123'
SESSION_SU = false
SESSION_RESAVE = false
SESSION_ROLLING = true
SESSION_SECURE = false
SESSION_HTTP = true

install nodemon globally on your machine

npm install -g nodemon

install all dependencies

npm install

run the application

nodemon index
