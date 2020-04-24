create database maxDigi;

use maxDigi

create table users(
id INT(6)  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
mobile VARCHAR(50),
city VARCHAR(50),
age INTEGER,
password VARCHAR(200),
userName VARCHAR(50)
);



CURL to add data

curl --location --request POST 'http://localhost:3000/api/users' \
--header 'Content-Type: application/json' \
--header 'X-Requested-With: XMLHttpRequest' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "user": {
        "email": "rahulshinde5140@gmail.com",
        "password": "12345",
        "firstName": "Rahul",
        "lastName": "Shinde",
        "userName": "rahul5140",
        "mobile": "8286246069",
        "city": "Mumbai",
        "age": 27,
        "dateOfBirth":":"03/16/1993"
    }
}'