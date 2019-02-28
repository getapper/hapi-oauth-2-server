const moment = require('moment')

module.exports = {
  getAccessToken: async () => {
    return { user: {}, accessTokenExpiresAt: moment().add(3, 'days').toDate() }
  },
  getAuthorizationCode: async () => {
    return 'works!'
  },
  getClient: async () => {
    return 'works!'
  },
  getUser: async () => {
    return 'works!'
  }
};
