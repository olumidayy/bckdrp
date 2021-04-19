const { port } = require("./config");
const configureApp = require("./app");

async function startServer() {
    const app = await configureApp();
    await new Promise(resolve => app.listen({ port }, resolve));
    console.log(`
        🚀 Server ready at running on port: ${port}
    `,);
}

startServer();

module.exports = startServer;
