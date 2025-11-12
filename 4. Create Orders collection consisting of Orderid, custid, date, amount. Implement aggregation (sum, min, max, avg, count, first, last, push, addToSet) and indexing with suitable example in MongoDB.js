//-------------------------------------------------------
// 1️⃣ Create Database and Switch to It
//-------------------------------------------------------
use OrderDB_Aggregation

//-------------------------------------------------------
// 2️⃣ Create Orders Collection and Insert Sample Documents
//-------------------------------------------------------
db.Orders.insertMany([
  { orderid: 1, custid: "C001", date: "2024-11-01", amount: 500 },
  { orderid: 2, custid: "C002", date: "2024-11-02", amount: 1500 },
  { orderid: 3, custid: "C001", date: "2024-11-03", amount: 1000 },
  { orderid: 4, custid: "C003", date: "2024-11-04", amount: 700 },
  { orderid: 5, custid: "C002", date: "2024-11-05", amount: 2000 },
  { orderid: 6, custid: "C001", date: "2024-11-06", amount: 800 },
  { orderid: 7, custid: "C003", date: "2024-11-07", amount: 900 },
  { orderid: 8, custid: "C002", date: "2024-11-08", amount: 1200 }
])

//-------------------------------------------------------
// 3️⃣ Verify Data
//-------------------------------------------------------
db.Orders.find().pretty()

//-------------------------------------------------------
// 4️⃣ Aggregation Examples
//-------------------------------------------------------

// 🔹 (a) SUM: Total amount spent by each customer
db.Orders.aggregate([
  { $group: { _id: "$custid", totalAmount: { $sum: "$amount" } } }
])

// 🔹 (b) MIN: Minimum order amount for each customer
db.Orders.aggregate([
  { $group: { _id: "$custid", minAmount: { $min: "$amount" } } }
])

// 🔹 (c) MAX: Maximum order amount for each customer
db.Orders.aggregate([
  { $group: { _id: "$custid", maxAmount: { $max: "$amount" } } }
])

// 🔹 (d) AVG: Average order amount per customer
db.Orders.aggregate([
  { $group: { _id: "$custid", avgAmount: { $avg: "$amount" } } }
])

// 🔹 (e) COUNT: Number of orders by each customer
db.Orders.aggregate([
  { $group: { _id: "$custid", orderCount: { $sum: 1 } } }
])

// 🔹 (f) FIRST: First order date of each customer
db.Orders.aggregate([
  { $sort: { date: 1 } }, // Sort by date first
  { $group: { _id: "$custid", firstOrder: { $first: "$date" } } }
])

// 🔹 (g) LAST: Last order date of each customer
db.Orders.aggregate([
  { $sort: { date: 1 } },
  { $group: { _id: "$custid", lastOrder: { $last: "$date" } } }
])

// 🔹 (h) PUSH: List of all order amounts for each customer
db.Orders.aggregate([
  { $group: { _id: "$custid", allOrders: { $push: "$amount" } } }
])

// 🔹 (i) ADDTOSET: Unique order amounts (no duplicates)
db.Orders.aggregate([
  { $group: { _id: "$custid", uniqueAmounts: { $addToSet: "$amount" } } }
])

//-------------------------------------------------------
// 5️⃣ Create Indexes (For Faster Querying)
//-------------------------------------------------------

// Create index on customer id
db.Orders.createIndex({ custid: 1 })

// Create compound index on customer and date
db.Orders.createIndex({ custid: 1, date: 1 })

// Check all indexes
db.Orders.getIndexes()
