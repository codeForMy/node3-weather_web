const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine and views location
app.set("view engine", "hbs"); // init view engine
app.set("views", viewsPath); // change the default name of view engine from 'views' to 'templates'
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // serve static public directory

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Cong Vien",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Mai Phuong",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is some helpful text.",
        name: "Cong Vien",
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: "You must provide an address!",
        });
    }

    geocode(
        address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error,
                    });
                }
                return res.send({
                    forecast: forecastData,
                    location,
                    address: address,
                });
            });
        }
    );
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found",
        name: "Cong Vien",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Cong Vien",
    });
});

// start up the server and listen on a specific port
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
