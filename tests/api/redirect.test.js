const request = require("supertest");
const { destroyClient, sendQuery, configureApp } = require("../utils");

const SHORTEN_URL = `
    query ShortenUrl($url: String!) {
        shortenUrl(url: $url) {
            url
        }
    }
`;

describe("Redirect Tests", () => {
    afterAll(async (done) => {
        await destroyClient();
        done();
    });

    it("Redirects a valid shortened URL successfully to the original URL", async () => {
        /**
         * This test checks to confirm that a valid shortened URL indeed
         * leads and redirects to the original URL. Such a request should
         * have a status code of 302 (Redirect), which indicates a redirection.
         */

        let url = "https://jestjs.io/docs/environment-variables";
        //The line below shortens a URL
        let res = await sendQuery({
            query: SHORTEN_URL,
            variables: { url },
        });
        let shortUrl = res.data.shortenUrl.url;
        let identifier = '/' + shortUrl.split("/").reverse()[0]; //The ID/identifier of this shortened URL is extracted.
        const app = await configureApp();
        res = await request(app)
            .get(identifier) //The ID is then passed to a request.
            .expect(302); //Indicating that there was a redirect.

        expect(res.headers.location).toBe(url); //Checks if it redirects to the original url.
    });

    it("Returns a 400 error for an invalid URL/identifier", async () => {
        /**
         * This test checks to confirm that an invalid shortened URL
         * is met with the appropriate error message with a status code of
         * 400 (Bad Request).
         */

        const app = await configureApp();
        res = await request(app)
            .get("/invalid") //An obviously invalid ID is passed to the request.
            .expect(400); //We expect the request to have a status code of 400.

        //The response body.message field should match the set message for a bad request.
        expect(res.body.message).toBe("That is not a valid identifier."); 
    });
});
