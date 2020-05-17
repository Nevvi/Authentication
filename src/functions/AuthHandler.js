'use strict';

const AWS = require('aws-sdk')
const Joi = require('joi');

class InvalidRequestError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 400;
    }
}

const registerSchema = {
    username: Joi.string().required(),
    password: Joi.string().required()
}

const loginSchema = {
    username: Joi.string().required(),
    password: Joi.string().required()
}

const validate = (schema, json) => {
    const {error} = Joi.object().keys(schema).validate(json, {convert: false, stripUnknown: true})
    if (error) {
        throw new InvalidRequestError(error.message)
    }
}

const Cognito = new AWS.CognitoIdentityServiceProvider()

module.exports.register = async (event) => {
    try{
        const body = typeof event.body === 'object' ? event.body : JSON.parse(event.body)
        validate(registerSchema, body)
        const registerResponse = await Cognito.signUp({
            ClientId: process.env.PUBLIC_USER_POOL_CLIENT_ID,
            Password: body.password,
            Username: body.username
        }).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(registerResponse)
        }
    } catch (e) {
        return {
            statusCode: e.statusCode || 500,
            body: JSON.stringify(e.message)
        }
    }
}

module.exports.login = async (event) => {
    try{
        const body = typeof event.body === 'object' ? event.body : JSON.parse(event.body)
        validate(loginSchema, body)
        const loginResponse = await Cognito.initiateAuth({
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.PUBLIC_USER_POOL_CLIENT_ID,
            AuthParameters: {
                PASSWORD: body.password,
                USERNAME: body.username
            },
        }).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(loginResponse)
        }
    } catch (e) {
        return {
            statusCode: e.statusCode || 500,
            body: JSON.stringify(e.message)
        }
    }
}