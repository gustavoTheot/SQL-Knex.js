const db = require('../database')

module.exports = {
    // List
    async index(req, res, next) {
        try{
            const { user_id, page = 1} = req.query; // selecionar projeto de cada usuário pelo id

            const query = db('projects')
            .limit(5) // limitando mostar até 5 valores na primeira pagina
            .offset((page -1) * 5) // descolameno para as proximas informações

             // total de paginas
             const countObject = db('projects').count()

            if(user_id){ // selecionando projetos que o usuário cm esse id esteja envolvido 
                query
                .where({user_id})
                .join('users', 'users.id', '=', 'projects.user_id')
                .select(
                    'projects.*',
                    'users.username',
                ) 
                
                countObject
                .where({user_id})
            }

            const [ count ] = await countObject
            res.header('T-total-count', count['count']) // salvando o total de paginas no header

            const results = await query

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
    async update(req, res, next) {
        try {
            const { title, user_id } = req.body
            const { id } = req.params
            
            await db('projects')
                .update({ title, user_id })
                .where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }
    }
}