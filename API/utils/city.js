exports.calculateDistance = (city1, city2) => {
    const lat1 = city1.latitude;
    const lon1 = city1.longitude;
    const lat2 = city2.latitude;
    const lon2 = city2.longitude;

    const p = Math.PI / 180;
    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + 
            Math.cos(lat1 * p) * Math.cos(lat2 * p) * 
            (1 - Math.cos((lon2 - lon1) * p)) / 2;
  
    const distance = (6371 * 2) * Math.asin(Math.sqrt(a));
    return parseFloat(distance.toFixed(2));
}