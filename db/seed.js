const Todo = require("./schema");
const seedData = require("./seeds.json");

Todo.remove({})
  .then(() => {
    return Todo.collection.insert(seedData);
  })
  .then(() => {
    process.exit();
  });
