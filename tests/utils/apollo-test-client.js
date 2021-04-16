const { ApolloServer } = require("apollo-server-express");
const {createTestClient} = require("apollo-server-testing");
const { typeDefs, resolvers } = require("../../src/api");

module.exports = () => {
    const apolloServer = new ApolloServer({
        typeDefs, resolvers
    });

    return createTestClient(apolloServer);
}