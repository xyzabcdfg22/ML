//-----------------------------------------------------
// 1️⃣ Create / Switch to Database
//-----------------------------------------------------
use LibraryDB_Queries

//-----------------------------------------------------
// 2️⃣ Insert Sample Documents
//-----------------------------------------------------
db.Books.insertMany([
  { bookid: 201, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", price: 350, available: true, tags: ["novel", "bestseller"] },
  { bookid: 202, title: "1984", author: "George Orwell", genre: "Dystopian", price: 400, available: true, tags: ["political", "novel"] },
  { bookid: 203, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", price: 320, available: false, tags: ["classic", "drama"] },
  { bookid: 204, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", price: 280, available: true, tags: ["motivational", "fiction"] },
  { bookid: 205, title: "Moby Dick", author: "Herman Melville", genre: "Adventure", price: null, available: false, tags: ["sea", "novel"] }
])

//-----------------------------------------------------
// 3️⃣ Query Examples (10+)
//-----------------------------------------------------

// 🔹 1. Find all books
db.Books.find()

// 🔹 2. Find one specific book
db.Books.findOne({ title: "1984" })

// 🔹 3. Find books with price greater than 300 (Query criteria)
db.Books.find({ price: { $gt: 300 } })

// 🔹 4. Find books with price between 300 and 400
db.Books.find({ price: { $gte: 300, $lte: 400 } })

// 🔹 5. OR Query — books by Orwell or Coelho
db.Books.find({ $or: [ { author: "George Orwell" }, { author: "Paulo Coelho" } ] })

// 🔹 6. NOT Query — books not in Classic genre
db.Books.find({ genre: { $not: { $eq: "Classic" } } })

// 🔹 7. Find books with NULL price (Type-specific query)
db.Books.find({ price: null })

// 🔹 8. Regular Expression — titles starting with "T"
db.Books.find({ title: /^T/ })

// 🔹 9. Querying Arrays — find books having tag "novel"
db.Books.find({ tags: "novel" })

// 🔹 10. Query where array contains both "novel" and "bestseller"
db.Books.find({ tags: { $all: ["novel", "bestseller"] } })

// 🔹 11. $where Query — find books where price > 350
db.Books.find({ $where: "this.price > 350" })

// 🔹 12. Combined Conditional — Classic books that are available
db.Books.find({ $and: [ { genre: "Classic" }, { available: true } ] })

// 🔹 13. Type Query — Find documents where price is a number
db.Books.find({ price: { $type: "number" } })

// 🔹 14. Find unavailable books (Boolean condition)
db.Books.find({ available: false })

//-----------------------------------------------------
// 4️⃣ Optional: Sorting, Limiting, Skipping Results
//-----------------------------------------------------

// Sort books by price descending
db.Books.find().sort({ price: -1 })

// Limit to 3 books
db.Books.find().limit(3)

// Skip first 2
db.Books.find().skip(2)

//-----------------------------------------------------
// 5️⃣ Check all documents
//-----------------------------------------------------
db.Books.find().pretty()
