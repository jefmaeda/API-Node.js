const path = require("path")

module.exports = {

  //object config
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    useNullAsDefault: true
  }
};
