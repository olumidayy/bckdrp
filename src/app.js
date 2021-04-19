const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");

const { typeDefs, resolvers, registerApp } = require("./api");

async function configureApp() {

    const server = new ApolloServer({ 
        typeDefs,
        resolvers,
        playground: true,
        introspection: true
    });
    await server.start();

    var app = express();   
    
    app.use(cors());
    server.applyMiddleware({ app, path: '/graphiql' });
    
    registerApp(app);
    return app;
}

configureApp();

module.exports = configureApp;
