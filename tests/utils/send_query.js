const request = require("supertest");
const configureApp = require("../../src/app");

async function sendQuery({ query, variables }) {
    const app = await configureApp();
    const res = await request(app)
        .post("/graphiql")
        .send({
            query,
            variables,
        })
        .then((res) => res.body)
        .catch(console.log);
    return res;
}

module.exports = sendQuery;
