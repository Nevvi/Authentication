'use strict'

const AuthenticationDao = require('../dao/AuthenticationDao')

module.exports = class AuthenticationService {
    constructor() {
        this.authenticationDao = new AuthenticationDao()
    }

    async register(registerRequest) {
        return await this.authenticationDao.register(registerRequest)
    }

    async login(loginRequest) {
        return await this.authenticationDao.login(loginRequest)
    }

    async logout(logoutRequest) {
        return await this.authenticationDao.logout(logoutRequest)
    }
}