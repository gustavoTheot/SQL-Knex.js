// utilizando coneção com o db
const db = require('../database')

module.exports = {
    // List
    async index(req, res, next) {
        try{
            const results = await db('users')

            return res.json(results)
        }
        catch(error){
            next(error)
        }
    },

    // Create
    async create(req, res, next){
        try{
            const { username } = req.body

            await db('users').insert({
                username
            })

            return res.status(201).send()

        }catch (error){
            next(error)
        }
    },

    // Update 
    async update(req, res, next){
        try{
            const { username } = req.body 
            const { id } = req.params

            await db('users')
            .update({username})
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

            let del = await db('users').where({id}).del()

            if(!del){
                return res.status(404).json({error: 'Nao encontrado'})
            }

            return res.json({inform: 'Deletado'}).send()

        }catch(error){
            next(error)
        }
    }
}