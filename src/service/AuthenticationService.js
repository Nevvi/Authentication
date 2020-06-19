'use strict'

const AuthenticationDao = require('../dao/AuthenticationDao')
const UserDao = require('../dao/user/UserDao')

module.exports = class AuthenticationService {
    constructor() {
        this.authenticationDao = new AuthenticationDao()
        this.userDao = new UserDao()
    }

    async register(registerRequest) {
        // create authentication account
        const newUser = await this.authenticationDao.register(registerRequest)

        // create profile
        await this.userDao.createUser(registerRequest.username)

        return newUser
    }

    async login(loginRequest) {
        return await this.authenticationDao.login(loginRequest)
    }

    async logout(logoutRequest) {
        return await this.authenticationDao.logout(logoutRequest)
    }
}