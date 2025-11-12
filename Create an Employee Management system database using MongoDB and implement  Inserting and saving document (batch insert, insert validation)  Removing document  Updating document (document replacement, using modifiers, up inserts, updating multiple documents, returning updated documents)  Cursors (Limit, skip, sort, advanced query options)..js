//----------------------------------------------------------
// 1️⃣ Create / Switch to Database
//----------------------------------------------------------
use EmployeeDB


//----------------------------------------------------------
// 2️⃣ Create Collection and Insert Documents
//----------------------------------------------------------

// Single insert
db.Employee.insertOne({
  emp_id: 101,
  name: "Amit Sharma",
  department: "HR",
  salary: 50000,
  city: "Mumbai"
})

// Batch insert (multiple documents)
db.Employee.insertMany([
  { emp_id: 102, name: "Riya Verma", department: "IT", salary: 75000, city: "Pune" },
  { emp_id: 103, name: "Karan Mehta", department: "Finance", salary: 62000, city: "Delhi" },
  { emp_id: 104, name: "Sneha Patil", department: "IT", salary: 80000, city: "Bangalore" }
])

// Insert validation example
db.createCollection("ValidatedEmployee", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["emp_id", "name", "department"],
      properties: {
        emp_id: { bsonType: "int", description: "Employee ID must be an integer" },
        name: { bsonType: "string", description: "Name must be a string" },
        department: { bsonType: "string", description: "Department must be a string" }
      }
    }
  }
})

db.ValidatedEmployee.insertOne({ emp_id: 105, name: "Neha", department: "HR" }) // ✅ works
// db.ValidatedEmployee.insertOne({ emp_id: "106", name: 123 }) // ❌ will fail validation


//----------------------------------------------------------
// 3️⃣ Removing Documents
//----------------------------------------------------------

// Delete one document
db.Employee.deleteOne({ emp_id: 104 })

// Delete multiple documents
db.Employee.deleteMany({ department: "Finance" })

// To check after deletion
db.Employee.find().pretty()


//----------------------------------------------------------
// 4️⃣ Updating Documents
//----------------------------------------------------------

// A. Full document replacement
db.Employee.replaceOne(
  { emp_id: 101 },
  { emp_id: 101, name: "Amit Sharma", department: "HR", salary: 55000, city: "Mumbai" }
)

// B. Using modifiers ($set, $inc, etc.)
db.Employee.updateOne(
  { emp_id: 102 },
  { $set: { city: "Hyderabad" }, $inc: { salary: 5000 } }
)

// C. Upsert (insert if not found)
db.Employee.updateOne(
  { emp_id: 110 },
  { $set: { name: "Rahul Singh", department: "Admin", salary: 45000, city: "Chennai" } },
  { upsert: true }
)

// D. Update multiple documents
db.Employee.updateMany(
  { department: "IT" },
  { $inc: { salary: 2000 } }
)

// E. Return updated document
db.Employee.find({ emp_id: 102 }).pretty()


//----------------------------------------------------------
// 5️⃣ Using Cursors (Query Operations)
//----------------------------------------------------------

// Show all employees
db.Employee.find().pretty()

// Limit - show only first 2 employees
db.Employee.find().limit(2).pretty()

// Skip - skip first 1 employee
db.Employee.find().skip(1).pretty()

// Sort by salary (ascending)
db.Employee.find().sort({ salary: 1 }).pretty()

// Sort by salary descending
db.Employee.find().sort({ salary: -1 }).pretty()

// Advanced query: find IT employees with salary > 70000
db.Employee.find({ department: "IT", salary: { $gt: 70000 } }).pretty()

// Another advanced query: find employees in Mumbai or Pune
db.Employee.find({ city: { $in: ["Mumbai", "Pune"] } }).pretty()
