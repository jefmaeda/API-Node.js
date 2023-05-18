const express = require("express")

//initialization express
const app = express()

//GET method
app.get("/message/:id/:user", (request, response) =>{
    //get parameter of browser (route params)
    const {id, user} = request.params
    //get response
    response.send(`ID: ${id} this user name is :${user}`)
})

//port listener 
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))