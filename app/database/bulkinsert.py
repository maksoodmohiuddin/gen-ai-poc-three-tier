import psycopg2
from psycopg2 import sql

# Establish a connection to the PostgreSQL server
conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="books",
    user="genai",
    password="genai"
)

# Create a cursor object to interact with the database
cursor = conn.cursor()

# Generate and execute SQL statements to insert 1000 book records
for i in range(1, 1001):
    title = f"Book {i}"
    author = f"Author {i}"
    description = f"Description {i}"
    published_date = f"2023-06-{i:02}"

    insert_query = sql.SQL("INSERT INTO books (title, author, description, published_date) VALUES (%s, %s, %s, %s)")
    cursor.execute(insert_query, (title, author, description, published_date))

# Commit the transaction to apply the changes
conn.commit()

# Close the cursor and the connection
cursor.close()
conn.close()

print("1000 book records have been inserted.")
