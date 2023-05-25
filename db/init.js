const { initializeDB } = require("./seedData");
const client = require("./client");

initializeDB()
    .catch(console.error)
    .finally(() => client.end());