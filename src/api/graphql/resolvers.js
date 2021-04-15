const { shortenUrl } = require('../../services/url');

module.exports = {
  Query: {
    shortenUrl: (_, { url }) => shortenUrl(url)
  }
};