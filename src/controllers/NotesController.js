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
}

module.exports = NotesController