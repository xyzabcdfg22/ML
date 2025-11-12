use FoodOrderingDB

// Customer Dimension
db.Customer_Dim.insertMany([
  { customerId: 1, name: "Alice", email: "alice@example.com", phone: "1234567890", city: "New York", country: "USA" },
  { customerId: 2, name: "Bob", email: "bob@example.com", phone: "9876543210", city: "London", country: "UK" }
]);

// Restaurant Dimension
db.Restaurant_Dim.insertMany([
  { restaurantId: 1, name: "Pizza Palace", city: "New York", cuisine: "Italian" },
  { restaurantId: 2, name: "Sushi World", city: "London", cuisine: "Japanese" }
]);

// Menu Item Dimension
db.MenuItem_Dim.insertMany([
  { menuItemId: 101, name: "Margherita Pizza", category: "Main", price: 12 },
  { menuItemId: 102, name: "California Roll", category: "Main", price: 8 }
]);

// Time Dimension
db.Time_Dim.insertMany([
  { timeId: 1, date: "2025-11-12", month: 11, quarter: 4, year: 2025 },
  { timeId: 2, date: "2025-11-13", month: 11, quarter: 4, year: 2025 }
]);

// Fact Table
db.Fact_Orders.insertMany([
  { orderId: 1, customerId: 1, restaurantId: 1, menuItemId: 101, timeId: 1, quantity: 2, totalAmount: 24, paymentMethod: "Card" },
  { orderId: 2, customerId: 2, restaurantId: 2, menuItemId: 102, timeId: 2, quantity: 1, totalAmount: 8, paymentMethod: "Cash" }
]);

// Star Schema Join (Aggregation)
db.Fact_Orders.aggregate([
  { $lookup: { from: "Customer_Dim", localField: "customerId", foreignField: "customerId", as: "customer" } },
  { $unwind: "$customer" },
  { $lookup: { from: "Restaurant_Dim", localField: "restaurantId", foreignField: "restaurantId", as: "restaurant" } },
  { $unwind: "$restaurant" },
  { $lookup: { from: "MenuItem_Dim", localField: "menuItemId", foreignField: "menuItemId", as: "menuItem" } },
  { $unwind: "$menuItem" },
  { $lookup: { from: "Time_Dim", localField: "timeId", foreignField: "timeId", as: "time" } },
  { $unwind: "$time" },
  {
    $project: {
      orderId: 1,
      quantity: 1,
      totalAmount: 1,
      paymentMethod: 1,
      "customer.name": 1,
      "customer.city": 1,
      "restaurant.name": 1,
      "restaurant.cuisine": 1,
      "menuItem.name": 1,
      "menuItem.category": 1,
      "menuItem.price": 1,
      "time.date": 1
    }
  }
]);


// Snowflake Schema 

use FoodOrderingDB

// Country Dimension
db.Country_Dim.insertMany([
  { countryId: 1, country: "USA" },
  { countryId: 2, country: "UK" }
]);

// City Dimension
db.City_Dim.insertMany([
  { cityId: 1, city: "New York", countryId: 1 },
  { cityId: 2, city: "London", countryId: 2 }
]);

// Customer Dimension
db.Customer_Dim.insertMany([
  { customerId: 1, name: "Alice", email: "alice@example.com", phone: "1234567890", cityId: 1 },
  { customerId: 2, name: "Bob", email: "bob@example.com", phone: "9876543210", cityId: 2 }
]);

// Cuisine Dimension
db.Cuisine_Dim.insertMany([
  { cuisineId: 1, cuisine: "Italian" },
  { cuisineId: 2, cuisine: "Japanese" }
]);

// Restaurant Dimension
db.Restaurant_Dim.insertMany([
  { restaurantId: 1, name: "Pizza Palace", cityId: 1, cuisineId: 1 },
  { restaurantId: 2, name: "Sushi World", cityId: 2, cuisineId: 2 }
]);

// Category Dimension
db.Category_Dim.insertMany([
  { categoryId: 1, category: "Starter" },
  { categoryId: 2, category: "Main" },
  { categoryId: 3, category: "Dessert" }
]);

// Menu Item Dimension
db.MenuItem_Dim.insertMany([
  { menuItemId: 101, name: "Margherita Pizza", categoryId: 2, price: 12 },
  { menuItemId: 102, name: "California Roll", categoryId: 2, price: 8 }
]);

// Time Dimension
db.Time_Dim.insertMany([
  { timeId: 1, date: "2025-11-12", month: 11, quarter: 4, year: 2025 },
  { timeId: 2, date: "2025-11-13", month: 11, quarter: 4, year: 2025 }
]);

// Fact Table
db.Fact_Orders.insertMany([
  { orderId: 1, customerId: 1, restaurantId: 1, menuItemId: 101, timeId: 1, quantity: 2, totalAmount: 24, paymentMethod: "Card" },
  { orderId: 2, customerId: 2, restaurantId: 2, menuItemId: 102, timeId: 2, quantity: 1, totalAmount: 8, paymentMethod: "Cash" }
]);

// Snowflake Schema Join (Aggregation)
db.Fact_Orders.aggregate([
  { $lookup: { from: "Customer_Dim", localField: "customerId", foreignField: "customerId", as: "customer" } },
  { $unwind: "$customer" },
  { $lookup: { from: "City_Dim", localField: "customer.cityId", foreignField: "cityId", as: "customerCity" } },
  { $unwind: "$customerCity" },
  { $lookup: { from: "Country_Dim", localField: "customerCity.countryId", foreignField: "countryId", as: "customerCountry" } },
  { $unwind: "$customerCountry" },
  { $lookup: { from: "Restaurant_Dim", localField: "restaurantId", foreignField: "restaurantId", as: "restaurant" } },
  { $unwind: "$restaurant" },
  { $lookup: { from: "Cuisine_Dim", localField: "restaurant.cuisineId", foreignField: "cuisineId", as: "cuisine" } },
  { $unwind: "$cuisine" },
  { $lookup: { from: "MenuItem_Dim", localField: "menuItemId", foreignField: "menuItemId", as: "menuItem" } },
  { $unwind: "$menuItem" },
  { $lookup: { from: "Category_Dim", localField: "menuItem.categoryId", foreignField: "categoryId", as: "category" } },
  { $unwind: "$category" },
  { $lookup: { from: "Time_Dim", localField: "timeId", foreignField: "timeId", as: "time" } },
  { $unwind: "$time" },
  {
    $project: {
      orderId: 1,
      quantity: 1,
      totalAmount: 1,
      paymentMethod: 1,
      "customer.name": 1,
      "customer.email": 1,
      "customer.phone": 1,
      "customerCity.city": 1,
      "customerCountry.country": 1,
      "restaurant.name": 1,
      "cuisine.cuisine": 1,
      "menuItem.name": 1,
      "category.category": 1,
      "menuItem.price": 1,
      "time.date": 1
    }
  }
]);


