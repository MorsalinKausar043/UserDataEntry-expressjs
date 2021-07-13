const express = require('express');
const app = express();
require('./db/db');
const UserData = require('./models/conn');
const path = require('path');
const hbs = require('hbs');
const { userInfo } = require('os');
const { urlencoded } = require('express');
const port = process.env.PORT || 8000;

// middleware link
const StaticPath = path.join(__dirname, "../public");
const templatespath = path.join(__dirname , "../templates/views")
const partialspath = path.join(__dirname , "../templates/partials")

// middleware
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(StaticPath));
app.use(urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views', templatespath);
hbs.registerPartials(partialspath);

app.get('/', (req, res) => {
    res.status(201).render('index');
})

app.post("/contact", async (req, res) => {
    try
    {
        const savedata = new UserData(req.body);
        await savedata.save();
        res.status(201).render("index")
    } catch (error)
    {
        res.status(500).send(error)
    }
});

app.get("/contact", async (req, res) => {
    try
    {
        const getuserdata = await UserData.find({});
        res.status(201).send(getuserdata);
    } catch (error)
    {
        res.status(500).send(error)
    }
});



// server listining and setup

app.listen(port, () => console.log(`express server is ${port}`));