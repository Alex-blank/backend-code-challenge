const AUTH_TOKEN = "dGhlc2VjcmV0dG9rZW4=";

module.exports = async function(req, res, next) {
    const auth = req.headers.authorization;
    const token = auth && auth.split(" ")[1]; // After bearer

    if (token === AUTH_TOKEN) next(); // Since we have no logged in user to compare to, we can at best check against a hardcoded token.
    else res.sendStatus(401);
}