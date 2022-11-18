const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const db = require("./database.js");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//Creates a new row with user information. 
app.post("/api/new", (req, res)=>{
    console.log(req.body);
    let sql = "INSERT INTO inbound_leads(name, email, phone, address, city, state, zip_code, equipment_type, description, estimated_value) " +
        "VALUES(?,?,?,?,?,?,?,?,?,?)";

    let params = [req.body.name, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.usState, req.body.zipcode, req.body.equipmentType, req.body.description, req.body.estimatedValue];
    db.run(sql,params, (err, res)=>{
        if(err){
            res.status(500).json({"error": err.message})
    }});

    db.all("SELECT * from inbound_leads", [], function(err, rows) {
        if (err) {
            res.status(400).json({"error": err.message})
        } else {
            console.log(rows);
            res.send("Success")
        }
    }) 
})

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/info", (req, res) => {
    res.json({ service: "Test API", version: "1.0.0" });
});

const EQUIPMENT_TYPES = [
    "Heavy/Construction Equipment", 
    "AG Equipment",
    "Vehicle",
    "Other"
];

app.get("/api/equipment_types", (req, res) => {
    res.json(EQUIPMENT_TYPES);
});

app.get("/api/departments", (req, res) => {
    db.all("SELECT * from departments", [], function(err, rows) {
        if (err) {
            res.status(400).json({"error": err.message})
        } else {
            res.json(rows)
        }
    })
});

// This needs to be the last route defined so that it does not
// block the other defined routes since it is a wildcard match.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
