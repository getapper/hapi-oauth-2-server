const Hapi = require('@hapi/hapi')
const HapiOAuth2Server = require('../')

module.exports = async model => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  server.register({
    plugin: HapiOAuth2Server,
    options: {
      model
    }
  })

  server.route({
    method: 'GET',
    path: '/authenticate',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server
        try {
          return await oauth.authenticate(req)
        } catch (e) {
          return h.response().code(401)
        }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/authorize',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server
        try {
          return await oauth.authorize(req)
        } catch (e) {
          return h.response().code(401)
        }
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/token',
    config: {
      handler: async (req, h) => {
        const { oauth } = req.server
        try {
          return await oauth.token(req)
        } catch (e) {
          console.log(e)
          return h.response().code(401)
        }
      }
    }
  })

  return server
}
