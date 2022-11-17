const path = require('path');
const express = require("express");
const db = require("./database.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//Creates a new row with user information. 
app.post("/", (req, res)=>{
    let sql = "INSERT INTO inbound_leads(name, email, phone, address, city, state, zip_code, equipment_type, description, estimated_value) " +
        "VALUES(?,?,?,?,?,?,?,?,?,?)";
    db.run(sql,[req.body.name, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.usState, req.body.zipcode, req.body.equipmentType, req.body.description, req.body.estimatedValue],
        (err)=>{if(err){
            res.status(500).json({"error": err.message})
        }})
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
