const crypto = require("crypto");
const { ValidationError } = require("apollo-server");

const db = require('../database');
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
            throw new ValidationError("That is not a valid URL.");
        }
        url = url.toLowerCase();        
        let [ exists ] = await db('url').where({ url });

        if(exists) {
            identifier = exists.id;
        } else {
            identifier = crypto.randomBytes(3).toString("hex");
            var [ shortUrl ] = await db('url').insert(
                { id: identifier, url },
                ['id', 'url']
            );
            identifier = shortUrl.id;
        }
        return {
            url: `${baseUrl}/${identifier}`
        };
    }

    static async fetchUrl(id) {
        let [ url ] = await db('url').where({ id }, ['url']);
        if(!url) {
            throw new ValidationError("That is not a valid identifier.");
        }
        return url.url;
    }
}

module.exports = UrlService;
