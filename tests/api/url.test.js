const { gql } = require("apollo-server-express");
const apolloTestClient = require("../utils/apollo-test-client");
const { destroyClient } = require("../../src/database");

const SHORTEN_URL = gql`
    query ShortenUrl($url: String!) {
        shortenUrl(url: $url) {
            url
        }
    }
`;

const LOGIN = gql`
    mutation login($email: String!) {
        login(email: $email) {
            token
        }
    }
`;

const BOOK_TRIPS = gql`
    mutation BookTrips($launchIds: [ID]!) {
        bookTrips(launchIds: $launchIds) {
            success
            message
            launches {
                id
                isBooked
            }
        }
    }
`;

describe("Queries", () => {

	afterAll(async done => {
		await destroyClient();
        done();
    });

    it("shortens a URL", async () => {
        /**
		 * This test checks to see that the query infacts shortens
		 * the URL and gives us the shortened version.
		 */

        const { query } = apolloTestClient();

        // // use our test server as input to the createTestClient fn
        // // This will give us an interface, similar to apolloClient.query
        // // to run queries against our instance of ApolloServer
		let url = "https://jestjs.io/docs/environment-variables";
        const res = await query({
            query: SHORTEN_URL,
			variables: { url }
        });
        expect(res.data.shortenUrl.url).toBeTruthy();
        expect(res.data.shortenUrl.url == url).toBeFalsy();
    });

    // it('fetches single launch', async () => {
    //   const {server, launchAPI, userAPI} = constructTestServer({
    //     context: () => ({user: {id: 1, email: 'a@a.a'}}),
    //   });

    //   launchAPI.get = jest.fn(() => [mockLaunchResponse]);
    //   userAPI.store = mockStore;
    //   userAPI.store.trips.findAll.mockReturnValueOnce([
    //     {dataValues: {launchId: 1}},
    //   ]);

    //   const {query} = createTestClient(server);
    //   const res = await query({query: GET_LAUNCH, variables: {id: 1}});
    //   expect(res).toMatchSnapshot();
    // });
});
