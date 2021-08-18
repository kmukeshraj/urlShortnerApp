const express = require('express');
const shortId = require('shortid');
const ShortUrl = require('../models/url.model.js');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { url } = req.body;
        if (!url) {
            throw new Error('provide valid url');
        }
        const UrlExists = await ShortUrl.findOne({ url });
        if (UrlExists) {
            res.send({ shortUrl: `${req.protocol}${'://'}${req.headers.host}/${'urlShotner'}/${UrlExists.shortId}` })
            return
        }
        const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() });
        const result = await shortUrl.save();
        res.send({ shortUrl: `${req.headers.host}/${'urlShotner'}/${result.shortId}` })
    } catch (error) {
        next(error);
    }
})


router.get('/:shortId', async (req, res, next) => {
    try {
        const { shortId } = req.params;
        const result = await ShortUrl.findOne({ shortId })
        if (!result) {
            throw new Error('short url not found');
        }
        res.redirect(result.url);
    } catch (error) {
        next(error)
    }

})

module.exports = router;