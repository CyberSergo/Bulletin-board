To use global (secret) data, install "dotenv" - "npm install dotenv".
Then create the ".ENV" file in the code directory and enter the following values ​​into it:

DB_HOST = "Name of host.  Default - 'localhost'"
DB_USER = "Name of user for open server SQL database"
DB_NAME = "Your databse name for sql DB"

NUM_PAGES = "How many files do you want to show on your page. Default - '6'"

SECRET_KEY = "Secret key for generating and decrypting the user's token"