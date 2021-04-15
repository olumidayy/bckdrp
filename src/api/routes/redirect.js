const { Router } = require('express');
const { fetchUrl } = require('../../services/url');

const router = Router();

module.exports = (app) => {
    app.use('/', router);
    
    router.get(
        '/:id', 
    
        async (req, res, next) => {
            try {
                let { id } = req.params;
                let url = await fetchUrl(id);
                res.redirect(url);
            } catch (error) {
                next(error);
            }
        });
}