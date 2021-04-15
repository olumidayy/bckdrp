const redirect = require('./routes/redirect');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schema');
const { handle404, handleErrors } = require('./utils');

function registerApp(app) {
    redirect(app);
    app.use(handle404);
    app.use(handleErrors);
    return app;
}

module.exports = {
    typeDefs,
    resolvers,
    registerApp
}