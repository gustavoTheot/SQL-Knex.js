const db = require('../database')

module.exports = {
    // List
    async index(req, res, next) {
        try{
            const results = await db('projects')
            .join('users', 'users.id', '=', 'projects.user_id')
            .select([
                'projects.id',
                'projects.user_id',
                'projects.title',
                'users.username',
                'projects.*',
            ])

            return res.json(results)
        }
        catch(error){
            next(error)
        }
    },

    // Create
    async create(req, res, next){
        try{
            const { title, user_id } = req.body

            await db('projects').insert({
                title,
                user_id
            })

            return res.status(201).send()

        }catch (error){
            next(error)
        }
    },

    // Update 
    async update(req, res, next){
        try{
            const { title } = req.body 
            const { id } = req.params

            await db('projects')
            .update({title})
            .where({id})

            return res.status(201).send()

        }catch(error){
            next(error)
        }
    },

    // Delete 
    async delete(req, res, next){
        try{
            const {id} = req.params

            let del = await db('projects').where({id}).del()

            if(!del){
                return res.status(404).json({error: 'Nao encontrado'})
            }

            return res.json({inform: 'Deletado'}).send()

        }catch(error){
            next(error)
        }
    }
}