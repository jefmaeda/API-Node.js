//create driver
const sqlite3 = require("sqlite3")
//connect driver
const sqlite = require("sqlite")
//create file in rota, regardless of which computer
const path = require("path")

async function sqliteConnection(){
    const database = await sqlite.open({
        //create database file, if you do not have
        filename: path.resolve(__dirname, "..","database.db"),
        driver: sqlite3.Database
    })
    return database
}
module.exports = sqliteConnection