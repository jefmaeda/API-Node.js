const { Router } = require("express")
const TagsController = require("../controllers/TagsController")

const tagsRoutes = Router()
const tagsController = new TagsController

tagsRoutes.get("/:user_id",tagsController.index)

//export ro anywhere
module.exports = tagsRoutes