const { Router } = require("express")
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()
const usersController = new UsersController

usersRoutes.post("/", usersController.create)

//export ro anywhere
module.exports = usersRoutes