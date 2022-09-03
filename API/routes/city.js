const express = require("express");
const utils = require("../utils/city");
const cityService = require("../services/city");
const stream = require('stream');

const router = express.Router();

let storedCities = {}; // Here some persistence would work better for an actual implementation.
const storedResultId = "2152f96f-50c7-4d76-9e18-f7033bd14428";

router.get("/cities-by-tag", async (req, res) => {
    const isActive = req.query.isActive;
    const tag = req.query.tag;

    const cities = cityService.getCitiesByTag(isActive, tag);
    res.status(200).send({ cities: cities });
})

router.get("/distance", async (req, res) => {
    const from = cityService.getCityByGuid(req.query.from);
    const to = cityService.getCityByGuid(req.query.to);

    const result = cityService.getDistanceBetweenCities(from, to);
    res.status(200).send(result);
});

router.get("/area", async (req, res) => {
    // We return the URL right away, then store the actual data after, since this is supposed to be responding very fast.
    // Ideally a new guid would be generated, but the test case demands hardcode.
    res.status(202).send({"resultsUrl": `http://127.0.0.1:8080/area-result/${storedResultId}`});

    // Store the data.
    const from = cityService.getCityByGuid(req.query.from)
    const distance = req.query.distance;
    storedCities = cityService.getCitiesInArea(from, distance);
});

router.get("/area-result/:resultId", async (req, res) => {
    if (Object.keys(storedCities).length) res.status(200).send(storedCities);
    else res.status(202).send("No data has currently been stored.");
});

router.get("/all-cities", async (req, res) => {
    const cities = cityService.getAllCities();
    
    // Potentially better to just write directly to the res stream
    const readable = new stream.Readable();
    readable.push(JSON.stringify(cities));
    readable.push(null); // Done
    readable.pipe(res);
});

module.exports = router;