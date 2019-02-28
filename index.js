const Joi = require('joi')
const OAuth2Server = require('oauth2-server')
const Request = require('oauth2-server').Request
const Response = require('oauth2-server').Response

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    await Joi.validate(options, Joi.object().keys({
      model: Joi.object().required()
    }))

    const oauthServer = new OAuth2Server(options)

    const oauth = {
      authenticate: async (req, options) => {
        const request = new Request({
          method: req.method.toUpperCase(),
          query: req.query,
          headers: req.headers
        })
        const response = new Response()
        return await oauthServer.authenticate(request, response, options)
      }
    }

    server.expose('oauth', oauth)
  }
}
