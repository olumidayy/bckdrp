const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");

const { typeDefs, resolvers, registerApp } = require("./api");

async function startServer() {

    const server = new ApolloServer({ typeDefs, resolvers, playground: true });
    await server.start();

    var app = express();   
    
    app.use(cors());
    server.applyMiddleware({ app, path: '/graphiql' });
    
    registerApp(app);
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`
        🚀 Server ready at http://localhost:4000${server.graphqlPath}
    `);
    return { app };
}

startServer();
