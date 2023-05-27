const { hash } = require("bcryptjs")
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

        const hashedPassword = await hash(password, 8)

        //insert into database
        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]
        )
        return response.status(201).json()
    }

    async update(request,response){
        const { name, email } = request.body
        const { id } = request.params

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

        if(!user){
            throw new AppError("User not found")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("This email is already in use")
        }

        user.name = name
        user.email = email

        await database.run(
        'UPDATE users SET name = ?, email = ?, updated_at = ? WHERE id = ?',
        [user.name, user.email, new Date(), id]
        )

        // status 200 is default
        return response.json()
    }
}

module.exports = UsersController