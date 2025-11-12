//-----------------------------------------------------
// 1️⃣ Create / Switch to Database
//-----------------------------------------------------
use PopulationDB

//-----------------------------------------------------
// 2️⃣ Create Collection and Insert Documents
//-----------------------------------------------------
db.Population.insertMany([
  { CountryId: "C001", stateId: "S001", City: "Delhi", year: 2020, Population: 19000000 },
  { CountryId: "C001", stateId: "S002", City: "Mumbai", year: 2020, Population: 22000000 },
  { CountryId: "C001", stateId: "S003", City: "Bangalore", year: 2020, Population: 12000000 },
  { CountryId: "C002", stateId: "S004", City: "New York", year: 2020, Population: 8400000 },
  { CountryId: "C002", stateId: "S005", City: "Los Angeles", year: 2020, Population: 4000000 },
  { CountryId: "C002", stateId: "S006", City: "Chicago", year: 2020, Population: 2700000 },
  { CountryId: "C003", stateId: "S007", City: "Tokyo", year: 2020, Population: 14000000 },
  { CountryId: "C003", stateId: "S008", City: "Osaka", year: 2020, Population: 9000000 }
])

//-----------------------------------------------------
// 3️⃣ Define Map and Reduce Functions
//-----------------------------------------------------

// Map function → emit CountryId as key and Population as value
var mapFunction = function() {
    emit(this.CountryId, this.Population);
};

// Reduce function → sum populations of each CountryId
var reduceFunction = function(keyCountry, valuesPop) {
    return Array.sum(valuesPop);
};

//-----------------------------------------------------
// 4️⃣ Execute MapReduce
//-----------------------------------------------------
db.Population.mapReduce(
    mapFunction,
    reduceFunction,
    {
        out: "TotalPopulationByCountry"
    }
)

//-----------------------------------------------------
// 5️⃣ View the Result
//-----------------------------------------------------
print("=== Total Population of Each Country ===");
db.TotalPopulationByCountry.find().pretty();

//-----------------------------------------------------
// 6️⃣ Create Indexes for Performance Optimization
//-----------------------------------------------------

// Index on CountryId (for faster grouping/search)
db.Population.createIndex({ CountryId: 1 });

// Index on year and City (for query optimization)
db.Population.createIndex({ year: 1, City: 1 });

//-----------------------------------------------------
// 7️⃣ Verify Indexes
//-----------------------------------------------------
db.Population.getIndexes();

//-----------------------------------------------------
// ✅ Optional: Aggregation Alternative (Modern Replacement)
//-----------------------------------------------------

db.Population.aggregate([
  { $group: { _id: "$CountryId", totalPopulation: { $sum: "$Population" } } },
  { $sort: { totalPopulation: -1 } }
]);
