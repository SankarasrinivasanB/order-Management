require("dotenv").config();

module.exports = {

    development : {
        database: "orders_db",
        host: "127.0.0.1"
    },

    test : {
        database: "orders_test",
        host: "127.0.0.1"
    },

    production : {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST
    }
}