const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // Pass to next layer of middleware
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// POST method route
app.post('/phone', function (req, res) {
    saveBodyToJson(req.body);
    res.sendStatus(200);
})

function saveBodyToJson(body, filePath='data_phone.json') {
    fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            console.log(obj);

            obj.lead_data.push(body); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(filePath, json, 'utf8', () => console.log("Lead is saved to json")); // write it back 
    }});
}
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})