//-----------------------------------------------------
// 1️⃣ Create / Switch to Database
//-----------------------------------------------------
use LibraryDB

//-----------------------------------------------------
// 2️⃣ Insert Documents (Batch Insert + Validation)
//-----------------------------------------------------

// Insert multiple books into the Books collection
db.Books.insertMany([
  { bookid: 101, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", price: 350, available: true },
  { bookid: 102, title: "1984", author: "George Orwell", genre: "Dystopian", price: 400, available: true },
  { bookid: 103, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", price: 320, available: false },
  { bookid: 104, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", price: 280, available: true },
  { bookid: 105, title: "Moby Dick", author: "Herman Melville", genre: "Adventure", price: 450, available: false }
])

// Validation check: Try inserting an invalid document (missing required field)
db.Books.insertOne({ title: "Invisible Man" }) // MongoDB allows it unless schema validation is added

//-----------------------------------------------------
// 3️⃣ Removing Documents
//-----------------------------------------------------

// Remove one book by title
db.Books.deleteOne({ title: "Moby Dick" })

// Remove all unavailable books
db.Books.deleteMany({ available: false })

//-----------------------------------------------------
// 4️⃣ Updating Documents
//-----------------------------------------------------

// (a) Document replacement (replace the entire document)
db.Books.replaceOne(
  { bookid: 101 },
  { bookid: 101, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Novel", price: 370, available: true }
)

// (b) Update using modifiers ($set)
db.Books.updateOne(
  { bookid: 102 },
  { $set: { price: 420 } }
)

// (c) Upsert: Insert if not found
db.Books.updateOne(
  { bookid: 106 },
  { $set: { title: "Pride and Prejudice", author: "Jane Austen", genre: "Classic", price: 300, available: true } },
  { upsert: true }
)

// (d) Update multiple documents at once
db.Books.updateMany(
  { genre: "Classic" },
  { $set: { available: true } }
)

// (e) Returning updated document (using findOneAndUpdate)
db.Books.findOneAndUpdate(
  { bookid: 104 },
  { $set: { price: 300 } },
  { returnNewDocument: true }
)

//-----------------------------------------------------
// 5️⃣ Cursors and Query Operations
//-----------------------------------------------------

// View all books
db.Books.find().pretty()

// Limit: Show only 3 books
db.Books.find().limit(3)

// Skip: Skip first 2 records
db.Books.find().skip(2)

// Sort: Sort books by price descending
db.Books.find().sort({ price: -1 })

// Advanced query: Find books with price > 300
db.Books.find({ price: { $gt: 300 } })

// OR query: Books by either "Orwell" or "Coelho"
db.Books.find({ $or: [ { author: "George Orwell" }, { author: "Paulo Coelho" } ] })

// NOT query: Books not by "F. Scott Fitzgerald"
db.Books.find({ author: { $ne: "F. Scott Fitzgerald" } })

// Regular expression: Find books whose title starts with "T"
db.Books.find({ title: /^T/ })

// Type check: Find where price is a number
db.Books.find({ price: { $type: "number" } })

//-----------------------------------------------------
// ✅ Verify all documents at the end
//-----------------------------------------------------
db.Books.find().pretty()
