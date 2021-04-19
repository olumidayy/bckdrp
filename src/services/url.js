const crypto = require("crypto");
const { ValidationError } = require("apollo-server-express");

const { db } = require('../database');
const { baseUrl } = require('../config');

class UrlService {

    /**
     * 
     * @param { the URL to be checked } url 
     * @returns {bool}
     * takes in a string an determines if it's a valid
     * URL or not. Returns a boolean value.
     */
    static isUrl = (url) => !!(new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i')
        .test(url))

    /**
     * 
     * @param { the URL to be shortened } url 
     * @returns {object}
     * This function takes in a URL, uses the function above to
     * check if it is valid. If valid, it checks if the URL is
     * already in the database, if so the previously shortened link
     * is sent back and if not it added to the database and the 
     * shortened URL is returned. 
     */
    static async shortenUrl(url) {
        let identifier;

        if(!UrlService.isUrl(url)) {
            let err = new ValidationError("That is not a valid URL.");
            err.status = 400;
            throw err;
        }      
        let [ exists ] = await db('urls').where({ url });
        if(exists) identifier = exists.id;
        else {
            identifier = crypto.randomBytes(3).toString("hex");
            var [ shortUrl ] = await db('urls').insert(
                { id: identifier, url }, ['id']
            );
            identifier = shortUrl.id;
        }
        return { url: `${baseUrl}/${identifier}` };
    }

    /**
     * 
     * @param { the identifier of the original URL } id
     * @returns { String }
     * This fucntion takes in an identifier for a shortened
     * URL, checks the database, and returns the corresponding
     * original URL.
     */
    static async fetchUrl(id, no, yes) {
        let err = new ValidationError("That is not a valid identifier.");
        err.status = 400;
        if(id.length > 6) throw err;
        let [ url ] = await db('urls').where({ id }, ['url']);
        if(!url) throw err;
        return url.url;
    }
}

module.exports = UrlService;
