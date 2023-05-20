const { Router } = require("express")

const usersRoutes = Router()


//POST method
usersRoutes.post("/", (request, response) => {
    const { name, email, password } = request.body
    response.json({ name, email, password })
})

//export ro anywhere
module.exports = usersRoutes