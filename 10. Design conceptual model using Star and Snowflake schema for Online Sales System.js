// ==========================================
// 🟢 STAR SCHEMA - Online Sales System
// ==========================================

// Use or create database
use OnlineSalesDB

// ==========================================
// 1️⃣ Customer Dimension
// ==========================================
db.Customer_Dim.insertMany([
  { customerId: 1, name: "Alice", email: "alice@example.com", city: "New York", country: "USA" },
  { customerId: 2, name: "Bob", email: "bob@example.com", city: "London", country: "UK" }
])

// ==========================================
// 2️⃣ Product Dimension
// ==========================================
db.Product_Dim.insertMany([
  { productId: 101, name: "Laptop", category: "Electronics", brand: "Dell", price: 1000 },
  { productId: 102, name: "Headphones", category: "Electronics", brand: "Sony", price: 150 }
])

// ==========================================
// 3️⃣ Time Dimension
// ==========================================
db.Time_Dim.insertMany([
  { timeId: 1, date: "2025-11-12", month: 11, quarter: 4, year: 2025 },
  { timeId: 2, date: "2025-11-13", month: 11, quarter: 4, year: 2025 }
])

// ==========================================
// 4️⃣ Store Dimension
// ==========================================
db.Store_Dim.insertMany([
  { storeId: 1, name: "Store A", city: "New York", country: "USA" },
  { storeId: 2, name: "Store B", city: "London", country: "UK" }
])

// ==========================================
// 5️⃣ Fact Table (Sales Facts)
// ==========================================
db.Fact_Sales.insertMany([
  { saleId: 1, customerId: 1, productId: 101, timeId: 1, storeId: 1, quantity: 2, totalAmount: 2000 },
  { saleId: 2, customerId: 2, productId: 102, timeId: 2, storeId: 2, quantity: 1, totalAmount: 150 }
])

// ==========================================
// ✅ View all collections for STAR schema
// ==========================================
show collections

// (Optional) Check data
// db.Fact_Sales.find().pretty()

db.Fact_Sales.aggregate([
  { $lookup: { from: "Customer_Dim", localField: "customerId", foreignField: "customerId", as: "customer" } },
  { $unwind: "$customer" },
  { $lookup: { from: "Product_Dim", localField: "productId", foreignField: "productId", as: "product" } },
  { $unwind: "$product" },
  { $lookup: { from: "Store_Dim", localField: "storeId", foreignField: "storeId", as: "store" } },
  { $unwind: "$store" },
  { $lookup: { from: "Time_Dim", localField: "timeId", foreignField: "timeId", as: "time" } },
  { $unwind: "$time" },
  {
    $project: {
      saleId: 1,
      quantity: 1,
      totalAmount: 1,
      "customer.name": 1,
      "product.name": 1,
      "store.name": 1,
      "time.date": 1
    }
  }
])


// ==========================================
// 🔵 SNOWFLAKE SCHEMA - Online Sales System
// ==========================================

// Use same database (OnlineSalesDB)
use OnlineSalesDB

// to drop earlier collections
// db.Country_Dim.drop()
// db.City_Dim.drop()
// db.Customer_Dim.drop()
// db.Brand_Dim.drop()
// db.Category_Dim.drop()
// db.Product_Dim.drop()
// db.Time_Dim.drop()
// db.Store_Dim.drop()
// db.Fact_Sales.drop()


// ==========================================
// 1️⃣ Country Dimension
// ==========================================
db.Country_Dim.insertMany([
  { countryId: 1, country: "USA" },
  { countryId: 2, country: "UK" }
])

// ==========================================
// 2️⃣ City Dimension
// ==========================================
db.City_Dim.insertMany([
  { cityId: 1, city: "New York", countryId: 1 },
  { cityId: 2, city: "London", countryId: 2 }
])

// ==========================================
// 3️⃣ Customer Dimension (linked to City)
// ==========================================
db.Customer_Dim.insertMany([
  { customerId: 1, name: "Alice", email: "alice@example.com", cityId: 1 },
  { customerId: 2, name: "Bob", email: "bob@example.com", cityId: 2 }
])

// ==========================================
// 4️⃣ Brand Dimension
// ==========================================
db.Brand_Dim.insertMany([
  { brandId: 1, brand: "Dell" },
  { brandId: 2, brand: "Sony" }
])

// ==========================================
// 5️⃣ Category Dimension
// ==========================================
db.Category_Dim.insertMany([
  { categoryId: 1, category: "Electronics" }
])

// ==========================================
// 6️⃣ Product Dimension (linked to Brand + Category)
// ==========================================
db.Product_Dim.insertMany([
  { productId: 101, name: "Laptop", categoryId: 1, brandId: 1, price: 1000 },
  { productId: 102, name: "Headphones", categoryId: 1, brandId: 2, price: 150 }
])

// ==========================================
// 7️⃣ Time Dimension
// ==========================================
db.Time_Dim.insertMany([
  { timeId: 1, date: "2025-11-12", month: 11, quarter: 4, year: 2025 },
  { timeId: 2, date: "2025-11-13", month: 11, quarter: 4, year: 2025 }
])

// ==========================================
// 8️⃣ Store Dimension (linked to City)
// ==========================================
db.Store_Dim.insertMany([
  { storeId: 1, name: "Store A", cityId: 1 },
  { storeId: 2, name: "Store B", cityId: 2 }
])

// ==========================================
// 9️⃣ Fact Table (Sales Facts)
// ==========================================
db.Fact_Sales.insertMany([
  { saleId: 1, customerId: 1, productId: 101, timeId: 1, storeId: 1, quantity: 2, totalAmount: 2000 },
  { saleId: 2, customerId: 2, productId: 102, timeId: 2, storeId: 2, quantity: 1, totalAmount: 150 }
])

// ==========================================
// ✅ View all collections for SNOWFLAKE schema
// ==========================================
show collections

// (Optional) Check data
// db.Fact_Sales.find().pretty()

//==============================================================================================================================
// ==============================================================================================================================
db.Fact_Sales.aggregate([
  // Join with Customer table
  { $lookup: { from: "Customer_Dim", localField: "customerId", foreignField: "customerId", as: "customer" } },
  { $unwind: "$customer" },

  // Join with City and Country (customer location hierarchy)
  { $lookup: { from: "City_Dim", localField: "customer.cityId", foreignField: "cityId", as: "customerCity" } },
  { $unwind: "$customerCity" },
  { $lookup: { from: "Country_Dim", localField: "customerCity.countryId", foreignField: "countryId", as: "customerCountry" } },
  { $unwind: "$customerCountry" },

  // Join with Product, Brand, and Category (product hierarchy)
  { $lookup: { from: "Product_Dim", localField: "productId", foreignField: "productId", as: "product" } },
  { $unwind: "$product" },
  { $lookup: { from: "Brand_Dim", localField: "product.brandId", foreignField: "brandId", as: "brand" } },
  { $unwind: "$brand" },
  { $lookup: { from: "Category_Dim", localField: "product.categoryId", foreignField: "categoryId", as: "category" } },
  { $unwind: "$category" },

  // Join with Store and its City
  { $lookup: { from: "Store_Dim", localField: "storeId", foreignField: "storeId", as: "store" } },
  { $unwind: "$store" },
  { $lookup: { from: "City_Dim", localField: "store.cityId", foreignField: "cityId", as: "storeCity" } },
  { $unwind: "$storeCity" },

  // Join with Time dimension
  { $lookup: { from: "Time_Dim", localField: "timeId", foreignField: "timeId", as: "time" } },
  { $unwind: "$time" },

  // Select final fields to show in output
  {
    $project: {
      saleId: 1,
      quantity: 1,
      totalAmount: 1,
      "customer.name": 1,
      "customer.email": 1,
      "customerCity.city": 1,
      "customerCountry.country": 1,
      "product.name": 1,
      "brand.brand": 1,
      "category.category": 1,
      "store.name": 1,
      "storeCity.city": 1,
      "time.date": 1
    }
  }
])



