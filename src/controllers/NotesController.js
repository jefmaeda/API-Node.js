const knex = require("../database/knex")

class NotesController{
    async create(request, response){
        const {title, description, tags, links} = request.body
        const {user_id} = request.params //search bar information

        //insert in notes
        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        })

        //links
        const linksInsert = links.map(link => {
            return{
                note_id,
                url: link
            }
        })

        await knex("links").insert(linksInsert)

        //tags
        const tagsInsert = tags.map(name => {
            return{
                note_id,
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert)

        response.json()
    }

    async show(request, response){
        const { id } = request.params

        //get notes specific where id
        const note = await knex("notes").where({id}).first()
        //get tags specific noteid of id(request.params)
        const tags = await knex("tags").where({note_id: id}).orderBy("name")
        const links = await knex("links").where({note_id: id}).orderBy("created_at")

        return response.json({
            ...note,
            tags,
            links
        })
    }
}

module.exports = NotesController