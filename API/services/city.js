const data = require("../../addresses.json");
const utils = require("../utils/city");

exports.getCityByGuid = (guid) => {
    return data.find(x => x.guid === guid)
}

exports.getCitiesByTag = (isActive, tag) => {
    return data.filter(city => city.isActive.toString() == isActive && city.tags.includes(tag));
}

exports.getDistanceBetweenCities = (from, to) => {
    const distance = utils.calculateDistance(from, to);
    return {
        from: from,
        to: to,
        unit: "km",
        distance: distance
    };
}

exports.getCitiesInArea = (from, distance) => {
    const citiesInArea = data.filter(city => city.guid !== from.guid && utils.calculateDistance(from, city) <= distance);
    return { cities: citiesInArea };
}

exports.getAllCities = () => data;
