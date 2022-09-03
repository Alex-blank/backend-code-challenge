const express = require("express");
const auth = require("./middleware/authentication");

// Routes
const cityRoutes = require("./routes/city");

// App
const app = express();
const PORT = "8080";

app.use(auth);
app.use(express.json());
app.use("/", cityRoutes);

app.listen(
    PORT,
    () => console.log(`API is running on http://localhost:${PORT}.`)
);