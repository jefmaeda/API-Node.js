const { Router } = require("express")

const usersRoutes = require("./users.routes")

const routes = Router()
//when accessing users automatically goes to usersRoutes
routes.use("/users", usersRoutes)

module.exports = routes