# Books API
This is a RESTful API for managing books.

Prerequisites
Node.js
PostgreSQL
Installation

## Clone the repository
git clone https://github.com/maksoodmohiuddin/gen-ai-poc-three-tier.git

## Navigate to the project directory:
### `cd app/backend `

Install the dependencies:
### 'npm install'

## Set up the PostgreSQL database:

Create a database named books.
Update the database connection details in api.js if necessary.

Start the server:
### 'npm start' 

The server will start running on http://localhost:3001.

## API Documentation
### Get All Books
Returns a list of books.

URL: /api/books
Method: GET
Query Parameters:
page (optional): The page number for pagination (default: 1).
limit (optional): The number of books per page (default: 10).
Example
Request:
GET /api/books?page=1&limit=10
Response: 
[
  {
    "id": 1,
    "title": "Book 1",
    "author": "Author 1",
    "description": "Description 1",
    "published_date": "2022-01-01"
  },
  {
    "id": 2,
    "title": "Book 2",
    "author": "Author 2",
    "description": "Description 2",
    "published_date": "2022-02-01"
  },
  ...
]

### Get a Book by ID
Returns a specific book by ID.

URL: /api/books/:id
Method: GET
URL Parameters:
id: The ID of the book.
Example
Request

GET /api/books/1
{
  "id": 1,
  "title": "Book 1",
  "author": "Author 1",
  "description": "Description 1",
  "published_date": "2022-01-01"
}

### Add a New Book
Adds a new book to the database.

URL: /api/books
Method: POST
Request Body:
title: The title of the book.
author: The author of the book.
description: The description of the book.
published_date: The published date of the book.
Example
Request:

POST /api/books
Content-Type: application/json

{
  "title": "New Book",
  "author": "New Author",
  "description": "New Description",
  "published_date": "2023-01-01"
}

Response:
201 Created

### Update a Book
Updates an existing book by ID.

URL: /api/books/:id
Method: PUT
URL Parameters:
id: The ID of the book.
Request Body:
title (optional): The updated title of the book.
author (optional): The updated author of the book.
description (optional): The updated description of the book.
published_date (optional): The updated published date of the book.
Example
Request:
PUT /api/books/1
Content-Type: application/json

{
  "title": "Updated Book"
}

Response: 
200 OK

### Delete a Book
Deletes a book by ID.

URL: /api/books/:id
Method: DELETE
URL Parameters:
id: The ID of the book.
Example
Request:
DELETE /api/books/1

Response:
204 No Content

## Sample cUrl 
### Get All Books
curl -X GET http://localhost:3001/api/books

### Create a new book:
curl -X POST -H "Content-Type: application/json" -d '{"title":"Gen AI is cool vol 1", "author":"Maksood Mohiuddin", "description":"Book Description", "published_date":"2023-06-08"}' http://localhost:3001/api/books

### Delete a book:
curl -X DELETE http://localhost:3001/api/books/{book_id}

### Get a specific book: 
curl -X GET http://localhost:3001/api/books/1002

### Update a specific book: 
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated Title 1", "author":"Updated Author 1", "description":"Updated Description 1", "published_date":"2023-06-08"}' http://localhost:3001/api/books/1

### License
This project is licensed under the MIT License.