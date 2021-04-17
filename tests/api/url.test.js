const { destroyClient, sendQuery } = require("../utils");

const SHORTEN_URL = `
    query ShortenUrl($url: String!) {
        shortenUrl(url: $url) {
            url
        }
    }
`;

describe("GraphQL Queries", () => {
    afterAll(async (done) => {
        await destroyClient();
        done();
    });

    it("shortens a valid URL", async () => {
        /**
         * This test checks to see that the query infacts shortens
         * the URL and gives us the shortened version.
         */

        let url = "https://jestjs.io/docs/environment-variables";
        const res = await sendQuery({
            query: SHORTEN_URL,
            variables: { url }
        });
        expect(res.data.shortenUrl).toBeTruthy();
        expect(res.data.shortenUrl.url).toBeTruthy();
        expect(res.data.shortenUrl.url == url).toBe.false;
    });

    it("returns an error for an invalid URL", async () => {
        /**
         * This test checks to see that the query infacts shortens
         * the URL and gives us the shortened version.
         */

        let url = "https/jestjs.io/docs/environment-variables";
        const res = await sendQuery({
            query: SHORTEN_URL,
            variables: { url }
        });
        expect(res.errors).toBeTruthy();
        expect(res.data.shortenUrl).toBeFalsy();
    });

    it("returns the same identifier for two same URLs", async () => {
        /**
         * This test checks to see that the query infacts shortens
         * the URL and gives us the shortened version.
         */

        let url =
            "https://www.notion.so/Backdrop-Coding-Challenge-WIP-b77847cfaa644a98812d6a6718324f66";
        let queryData = {
            query: SHORTEN_URL,
            variables: { url },
        };
        const res0 = await sendQuery(queryData);
        const res1 = await sendQuery(queryData);
        expect(res0.data).toStrictEqual(res1.data);
        expect(res0.data.shortenUrl).toStrictEqual(res1.data.shortenUrl);
        expect(res0.data.shortenUrl.url).toBe(res1.data.shortenUrl.url);
        expect(res0.errors).toBe(res1.errors);
        expect(res0.errors).toBeFalsy();
    });
});
