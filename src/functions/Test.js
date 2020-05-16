'use strict'

module.exports.test = async (event) => {
    console.log(event)
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'Hello!'})
    }
}