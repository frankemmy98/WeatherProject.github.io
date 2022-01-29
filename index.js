const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){

const query = req.body.cityName
const apiKey = "b050e26e45ce8af5a771a653e6d23ec8" // Authentication
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function(response){

    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

     /*   console.log(temp);
        console.log(weatherDescription);
     */

        res.write("<p>The weather is currently " + weatherDescription +"</p>")
        res.write("<h1>The weather in " + query + " is " + temp + "degree Celcius.</h1>")
        res.write("<img src=" + imageUrl + ">")
        res.send();

/*        const object = {
            name: "Emmanuel",
            favouriteFood: "Rice"
        }
        console.log(JSON.stringify(object));
*/
       })


    })
})






app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})