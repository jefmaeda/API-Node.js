const express = require("express")

//initialization express
const app = express()

//port listener
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))