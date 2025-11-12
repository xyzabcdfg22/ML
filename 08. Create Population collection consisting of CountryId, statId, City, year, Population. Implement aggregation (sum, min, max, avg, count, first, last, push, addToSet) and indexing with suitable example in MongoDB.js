//-----------------------------------------------------
// 1️⃣ Create / Switch to Database
//-----------------------------------------------------
use PopulationDB

//-----------------------------------------------------
// 2️⃣ Create Collection and Insert Sample Documents
//-----------------------------------------------------
db.Population.insertMany([
  { CountryId: "C001", stateId: "S001", City: "Delhi", year: 2020, Population: 19000000 },
  { CountryId: "C001", stateId: "S002", City: "Mumbai", year: 2021, Population: 22500000 },
  { CountryId: "C001", stateId: "S003", City: "Bangalore", year: 2022, Population: 12500000 },
  { CountryId: "C002", stateId: "S004", City: "New York", year: 2020, Population: 8500000 },
  { CountryId: "C002", stateId: "S005", City: "Los Angeles", year: 2021, Population: 4100000 },
  { CountryId: "C002", stateId: "S006", City: "Chicago", year: 2022, Population: 2750000 },
  { CountryId: "C003", stateId: "S007", City: "Tokyo", year: 2020, Population: 13900000 },
  { CountryId: "C003", stateId: "S008", City: "Osaka", year: 2021, Population: 9000000 },
  { CountryId: "C003", stateId: "S009", City: "Nagoya", year: 2022, Population: 2300000 }
])

//-----------------------------------------------------
// 3️⃣ Aggregation Examples
//-----------------------------------------------------

// (a) SUM → Total population of each country
print("=== Total Population (SUM) ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", totalPopulation: { $sum: "$Population" } } }
]);

// (b) MIN → Minimum population per country
print("=== Minimum Population (MIN) ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", minPopulation: { $min: "$Population" } } }
]);

// (c) MAX → Maximum population per country
print("=== Maximum Population (MAX) ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", maxPopulation: { $max: "$Population" } } }
]);

// (d) AVG → Average population per country
print("=== Average Population (AVG) ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", avgPopulation: { $avg: "$Population" } } }
]);

// (e) COUNT → Number of cities per country
print("=== City Count per Country (COUNT) ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", totalCities: { $sum: 1 } } }
]);

// (f) FIRST → First city record (based on insertion order)
print("=== First City per Country ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", firstCity: { $first: "$City" } } }
]);

// (g) LAST → Last city record (based on insertion order)
print("=== Last City per Country ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", lastCity: { $last: "$City" } } }
]);

// (h) PUSH → List all cities per country (may include duplicates)
print("=== List of Cities (PUSH) ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", cities: { $push: "$City" } } }
]);

// (i) ADDTOSET → Unique list of cities per country
print("=== Unique Cities (ADDTOSET) ===");
db.Population.aggregate([
  { $group: { _id: "$CountryId", uniqueCities: { $addToSet: "$City" } } }
]);

//-----------------------------------------------------
// 4️⃣ Indexing (for faster queries)
//-----------------------------------------------------

// Create index on CountryId
db.Population.createIndex({ CountryId: 1 });

// Create compound index on CountryId and year
db.Population.createIndex({ CountryId: 1, year: 1 });

// View all created indexes
db.Population.getIndexes();
