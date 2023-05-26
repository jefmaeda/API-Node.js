const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

//vamos usar a class para agrupamento de functions
class UsersController {
    /**
     * index - GET para listar verios registros
     * show - GET para exibir um registro especifico
     * create - POST para criar um registro
     * update - PUT para atualizar um registro
     * delete - DELETE para remover um registro
     */


    async create(request,response){
        const { name, email, password } = request.body
        const database = await sqliteConnection()
        // get information
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)",[email])

        if (checkUserExists){
            throw new AppError("This email is already in use.")
        }

        return response.status(201).json()
    }
}

module.exports = UsersController