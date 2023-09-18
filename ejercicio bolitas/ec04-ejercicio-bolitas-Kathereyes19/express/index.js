//import modules 
const express = require('express')
const app = express()
const port = 3000

const cors = require ('cors');
app.use(cors());

//Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Declaration - List of Points
let points = []

//Get Points
app.get('points', (req,res) => {
    res.send({"points": points})
})

//Add a New Point
app.post ('/points', (req,res) => {
    const newPoint = {
        x:req.body.x,
        y:req.body.y,
        r:req.body.r,
        g:req.body.g,
        b:req.body.b,
    }

    points.push(newPoint);
    res.send({"response":'new pomit at ${newPoint.x}, ${newPoint.y}'});
})

//Stared
app.get('/points', (req, res) => {
    res.send('the server has started successfully')
})

//Clear - List of Points
app.post('/clear', (req,res) => {
    points = []
    res.send('the point was removed successfully')
})

//Check the server
app.get('/', (req,res) => {
    res.send('the server started correctly')
})

//Start the Server
app.listen(port,() => {
    console.log('Listening on port ${port}')
})
