'use strict'

const axios = require('axios')

module.exports = class UserDao {
    constructor() {
        this.baseUrl = process.env.USER_API_URL
    }

    async createUser(username) {
        return await axios.post(`${this.baseUrl}/v1/users`, {username})
    }
}