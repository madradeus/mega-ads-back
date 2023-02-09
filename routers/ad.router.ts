import { Router } from "express";

export const adRouter = Router();


adRouter
    .get('/', async (req, res) => {

        res.json({
            response: 'many ads'
        })
    })
    .get('/:adId', async (req, res) => {

        res.json({
            response: req.params.adId
        })
    })
    .post('/', async (req, res) => {

        res.json({
            response: 'create new ad'
        })
    })