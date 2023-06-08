Get all books:
curl -X GET http://localhost:3001/api/books

Create a new book:
curl -X POST -H "Content-Type: application/json" -d '{"title":"Gen AI is cool vol 1", "author":"Maksood Mohiuddin", "description":"Book Description", "published_date":"2023-06-08"}' http://localhost:3001/api/books

Delete a book:
curl -X DELETE http://localhost:3001/api/books/{book_id}

Get a specific book: 
curl -X GET http://localhost:3001/api/books/1002

Update a specific book: 
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated Title 1", "author":"Updated Author 1", "description":"Updated Description 1", "published_date":"2023-06-08"}' http://localhost:3001/api/books/1
