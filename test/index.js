const build = require('./server')
const model = require('./model')
const code = require('code')
const labLib = require('lab')

const lab = (exports.lab = labLib.script())
const describe = lab.describe
const before = lab.before
const it = lab.it
const expect = code.expect

describe('Hapi oauth2 server', () => {
  let server
  let res

  before(async () => {
    server = await build(model)
  })

  it('should fail for no authentication provided', async () => {
    res = await server.inject({
      method: 'GET',
      url: '/authenticate'
    })
    expect(res.statusCode, 'Wrong HTTP response status code').to.equal(401)
  })

  it('should authenticate', async () => {
    res = await server.inject({
      method: 'GET',
      url: '/authenticate',
      headers: {Authorization: 'Bearer foobar'}
    })
    expect(res.statusCode, 'Wrong HTTP response status code').to.equal(200)
  })
})
