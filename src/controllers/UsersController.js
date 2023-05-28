const { hash,compare } = require("bcryptjs")
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
        const { name, email, password, old_password } = request.body
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

        //validating name and email
        user.name = name ?? user.name
        user.email = email ?? user.email

        //update password
        if (password && !old_password) {
            throw new AppError("old password information")
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword){
                throw new AppError("The old password not check")
            }

            user.password = await hash(password, 8)
        }

        await database.run(
        `
        UPDATE users SET name = ?,
         email = ?, 
         password = ?, 
         updated_at = DATETIME('now') WHERE id = ?
         `,
        [user.name, user.email, user.password, id]
        )

        // status 200 is default
        return response.json()
    }
}

module.exports = UsersController