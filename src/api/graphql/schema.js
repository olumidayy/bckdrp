const { gql } = require('apollo-server');

const typeDefs = gql`
  type Url {
    id: String!
    url: String!
  }

  type Query {
    shortenUrl(url: String!): Url
  }
`;

module.exports = typeDefs;