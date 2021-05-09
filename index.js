const Joi = require('joi')
const OAuth2Server = require('oauth2-server')
const Request = require('oauth2-server').Request
const Response = require('oauth2-server').Response

const fromHapiReq = req => {
  const { method, payload, ...other } = req
  return new Request({
    method: method.toUpperCase(),
    body: payload,
    ...other
  })
}

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {

    Joi.assert(options, Joi.object().keys({
      model: Joi.alternatives().try(Joi.object().required(), Joi.function())
    }));

    const model = typeof options.model === 'function' ? options.model(server) : options.model;

    const oauthServer = new OAuth2Server({
      ...options,
      model: model
    })


    const oauth = {
      authenticate: async (req, options) => {
        const request = fromHapiReq(req)
        const response = new Response()
        return await oauthServer.authenticate(request, response, options)
      },
      authorize: async (req, options) => {
        const request = fromHapiReq(req)
        const response = new Response()
        return await oauthServer.authorize(request, response, options)
      },
      token: async (req, options) => {
        const request = fromHapiReq(req)
        const response = new Response()
        return await oauthServer.token(request, response, options)
      }
    }

    server.expose('oauth', oauth)
  }
}
