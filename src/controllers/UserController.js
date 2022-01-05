const db = require('../database') // utilizando coneção com o db

module.exports = {
    async index(req, res) {
        const results = await db('users')

        return res.json(results)
    }
}