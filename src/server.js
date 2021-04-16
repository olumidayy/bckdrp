const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");

const { typeDefs, resolvers, registerApp } = require("./api");
const { port } = require("./config");

async function startServer() {

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
    await new Promise(resolve => app.listen({ port }, resolve));
    console.log(`
        🚀 Server ready at http://localhost:${port}${server.graphqlPath}
    `,);
    return { app };
}
console.log(require('./config').env)
startServer();
