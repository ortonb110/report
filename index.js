const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

//Add data
app.post('/reporter', async(req, res)=> {
   try {
    const {client_id, incident_desc, city, country, date, weather_report } = req.body;
    const newReport = await pool.query("INSERT INTO incidents (client_id, incident_desc, city, country, date, weather_report) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [client_id, incident_desc, city, country, date, weather_report]);

    res.json(newReport);

   } catch (err) {
        console.error(err.message)
   }
})


//Get all data

app.get("/reporter", async(req, res) => {
    const getReport = await pool.query("SELECT * FROM incidents");

    res.json(getReport);
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});