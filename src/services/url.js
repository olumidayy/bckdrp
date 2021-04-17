const crypto = require("crypto");
const { ValidationError } = require("apollo-server-express");

const { db } = require('../database');
const { baseUrl } = require('../config');

class UrlService {

    static isUrl = (url) => !!(new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i')
        .test(url))

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

    static async fetchUrl(id) {
        let err = new ValidationError("That is not a valid identifier.");
        err.status = 400;
        if(id.length > 6) throw err;
        let [ url ] = await db('urls').where({ id }, ['url']);
        if(!url) throw err;
        return url.url;
    }
}

module.exports = UrlService;
