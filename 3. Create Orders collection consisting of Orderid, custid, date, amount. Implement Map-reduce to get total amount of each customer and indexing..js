//----------------------------------------------------------
// 1️⃣ Create / Switch to Database
//----------------------------------------------------------
use OrderDB


//----------------------------------------------------------
// 2️⃣ Create Collection and Insert Sample Data
//----------------------------------------------------------
db.Orders.insertMany([
  { orderid: 1, custid: "C001", date: ISODate("2025-11-01"), amount: 1500 },
  { orderid: 2, custid: "C002", date: ISODate("2025-11-03"), amount: 2200 },
  { orderid: 3, custid: "C001", date: ISODate("2025-11-05"), amount: 1300 },
  { orderid: 4, custid: "C003", date: ISODate("2025-11-06"), amount: 800 },
  { orderid: 5, custid: "C002", date: ISODate("2025-11-07"), amount: 4000 },
  { orderid: 6, custid: "C001", date: ISODate("2025-11-08"), amount: 2200 },
  { orderid: 7, custid: "C003", date: ISODate("2025-11-09"), amount: 1500 }
])


//----------------------------------------------------------
// 3️⃣ Verify Data
//----------------------------------------------------------
db.Orders.find().pretty()


//----------------------------------------------------------
// 4️⃣ Implement Map-Reduce
//----------------------------------------------------------

// 🔹 Map Function – emits customer ID as key and amount as value
var mapFunction = function() {
  emit(this.custid, this.amount);
};

// 🔹 Reduce Function – sums all amounts for each customer
var reduceFunction = function(key, values) {
  return Array.sum(values);
};

// 🔹 Execute Map-Reduce
db.Orders.mapReduce(
  mapFunction,
  reduceFunction,
  {
    out: "CustomerTotalAmount"
  }
)


//----------------------------------------------------------
// 5️⃣ View Results of Map-Reduce
//----------------------------------------------------------
print("=== Total Amount Spent by Each Customer ===");
db.CustomerTotalAmount.find().pretty();


//----------------------------------------------------------
// 6️⃣ Create Indexes
//----------------------------------------------------------

// 🔹 Create index on customer ID (frequent lookup)
db.Orders.createIndex({ custid: 1 });

// 🔹 Create compound index on custid + date (for reports by date)
db.Orders.createIndex({ custid: 1, date: -1 });

// 🔹 Show all indexes
db.Orders.getIndexes();


//----------------------------------------------------------
// 7️⃣ Verify index usage (optional for viva)
//----------------------------------------------------------
db.Orders.find({ custid: "C001" }).explain("executionStats");
