module.exports = {
    development: {
        client: "mysql2",
        connection: {
            "host": "localhost",
            "user": "root",
            "password": "vsmaster",
            "database": "leadster"
        }
    },
    production: {
        client: 'mysql2',
        connection: process.env.JAWSDB_URL
    },
}