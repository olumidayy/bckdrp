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
         * This test checks to see that the query infacts shortens
         * the URL and gives us the shortened version.
         */

        let url = "https://jestjs.io/docs/environment-variables";
        let res = await sendQuery({
            query: SHORTEN_URL,
            variables: { url }
        });
        expect(res.data.shortenUrl).toBeTruthy();
        expect(res.data.shortenUrl.url).toBeTruthy();
        expect(res.data.shortenUrl.url == url).toBe.false;

        let shortenedUrl = res.data.shortenUrl.url;
        const app = await configureApp();
        res = await request(app)
            .get('/a33ab1')
            .expect(302); //Indicating that there was a redirect.
        
        expect(res.headers.location).toBe(url); //Checks if it redirects to the original url.        
    });

    it("Returns a 400 error for an invalid URL/identifier", async () => {
        /**
         * This test checks to see that the query infact shortens
         * the URL and gives us the shortened version.
         */

        const app = await configureApp();
        res = await request(app)
            .get('/invalid')
            .expect(400);
        
        expect(res.body.message).toBe("That is not a valid identifier.");
        
        //expect(res.headers.location).toBe(url); //Checks if it redirects to the original url.        
    });    
});
