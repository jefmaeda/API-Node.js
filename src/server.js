const express = require("express")
const routes = require("./routes")

//initialization express
const app = express()
//body type json
app.use(express.json())
app.use(routes)

//GET method
// app.get("/message/:id/:user", (request, response) =>{
//     //get parameter of browser (route params)
//     const {id, user} = request.params
//     //get response
//     response.send(`ID: ${id} this user name is :${user}`)
// })

// app.get("/users", (request, response) =>{
//     const {page,limit} = request.query
//     response.send(`Page: ${page}. Show: ${limit}`)
// })



//port listener 
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))