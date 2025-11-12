//----------------------------------------------------------
// 1️⃣ Create / Switch to Database
//----------------------------------------------------------
use EmployeeDB


//----------------------------------------------------------
// 2️⃣ Create & Insert Sample Data
//----------------------------------------------------------
db.Employee.insertMany([
  { emp_id: 201, name: "Amit Sharma", department: "HR", salary: 50000, city: "Mumbai", skills: ["Communication", "Recruitment"] },
  { emp_id: 202, name: "Riya Verma", department: "IT", salary: 75000, city: "Pune", skills: ["Java", "Python", "MongoDB"] },
  { emp_id: 203, name: "Karan Mehta", department: "Finance", salary: 62000, city: "Delhi", skills: ["Accounts", "Excel"] },
  { emp_id: 204, name: "Sneha Patil", department: "IT", salary: 80000, city: "Bangalore", skills: ["Python", "React"] },
  { emp_id: 205, name: "Rahul Singh", department: "Admin", salary: 45000, city: null, skills: ["Management"] }
])


//----------------------------------------------------------
// 3️⃣ Basic Find Operations
//----------------------------------------------------------

// (1) Find all employees
db.Employee.find().pretty()

// (2) Find one employee (returns first match only)
db.Employee.findOne({ department: "IT" })

// (3) Find specific values (projection)
db.Employee.find({}, { name: 1, salary: 1, _id: 0 })


//----------------------------------------------------------
// 4️⃣ Query Criteria Examples
//----------------------------------------------------------

// (4) Find employees with salary > 60000
db.Employee.find({ salary: { $gt: 60000 } }).pretty()

// (5) Find employees with salary between 50000 and 80000
db.Employee.find({ salary: { $gte: 50000, $lte: 80000 } }).pretty()

// (6) OR query – employees in HR or Admin
db.Employee.find({ $or: [ { department: "HR" }, { department: "Admin" } ] }).pretty()

// (7) $not query – employees not from IT department
db.Employee.find({ department: { $not: { $eq: "IT" } } }).pretty()

// (8) Conditional semantics – employees with salary not equal to 75000
db.Employee.find({ salary: { $ne: 75000 } }).pretty()


//----------------------------------------------------------
// 5️⃣ Type-Specific Queries
//----------------------------------------------------------

// (9) Null check – employees with no city information
db.Employee.find({ city: null }).pretty()

// (10) Regular expression – find employees whose name starts with 'R'
db.Employee.find({ name: { $regex: /^R/, $options: "i" } }).pretty()

// (11) Querying arrays – employees having "Python" as a skill
db.Employee.find({ skills: "Python" }).pretty()

// (12) Array query – employees having both Python and MongoDB
db.Employee.find({ skills: { $all: ["Python", "MongoDB"] } }).pretty()


//----------------------------------------------------------
// 6️⃣ $where Queries
//----------------------------------------------------------

// (13) Using $where to find employees with salary > 60000
db.Employee.find({ $where: "this.salary > 60000" }).pretty()

// (14) $where – employees whose name length > 10 characters
db.Employee.find({ $where: "this.name.length > 10" }).pretty()
