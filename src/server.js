require("express-async-errors")

const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")

//initialization express
const app = express()
//body type json
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
    //error client
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

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