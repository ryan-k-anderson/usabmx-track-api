const express = require('express');
const app = express();
const port = 3000;

//Middleware to parse JSON
app.use(express.json());

//Sample Data
let tracks = [
    {id:1, name:'Far North Bmx', state: 'Alaska', city: 'Fairbanks', district: 'AK01'},
    {id:2, name:'Oak mountain BMX', state: 'Alabama', city: 'Pelham', district: 'AL01'},
    {id:3, name:'Circle City BMX', state: 'Alabama', city: 'Dothan', district: 'AL01'},
    {id:4, name:'Fountain City Bmx', state: 'Alabama', city: 'Prattville', district: 'AL01'}
];

//Routes
app.get('/tracks', (req,res) => {
    res.json(tracks);
    console.log('Response successfully sent')
});

app.get('/tracks/:id', (req,res) => {
    const track = tracks.find(t => t.id === parseInt(req.params.id));
    if (!track) return res.status(404).send('Track not listed');
    res.json(track);
});

app.post('/tracks', (req,res) => {
    const newTrack = {
        id: tracks.length + 1,
        name: req.body.name,
        state: req.body.state,
        city: req.body.city,
        district: req.body.district
    };
    tracks.push(newTrack);
    res.status(201).json(newTrack);
});

app.put('/tracks/:id', (req,res) => {
    const track = tracks.find(t => t.id === parseInt(req.params.id));
    if(!track) return res.status(404).send('Track not found');

    track.name = req.body.name;
    track.state = req.body.state;
    track.city = req.body.city;
    track.district = req.body.district;
    res.json(track)
});

//Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
});