import { Router } from "express";
import { AdRecord } from "../records/ad.record";

export const adRouter = Router();


adRouter
    .get('/', async (req, res) => {

        const { name: searchingName } = req.query as {
            name: string
        };
        const phrase = searchingName ?? '';
        const ads = await AdRecord.findAll(phrase);

        res.json({
            ads,
        })
    })
    .get('/:adId', async (req, res) => {

        const ad = await AdRecord.getOne(req.params.adId);

        res.json(ad)
    })
    .post('/', async (req, res) => {

        const ad = new AdRecord(req.body);
        await ad.insert();

        res.status(201);
        res.json(ad)
    })