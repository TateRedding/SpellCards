const { reseedDB } = require("./seedData");
const client = require("./client");

reseedDB()
    .catch(console.error)
    .finally(() => client.end());