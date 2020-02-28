var express = require("express");
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended : true}))
app.set("view engine","ejs");

    var campgrounds = [
        {title : "RV camp", image : "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {title : "Top site", image : "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {title : "Ginnie Spring site", image : "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"}
        ];


app.get("/",function(req,res){
    res.send("This is Home page");
});

app.get("/land",function(req,res){
    res.render("landings");
});

app.get("/campground",function(req, res) {

   res.render("campground", {campgrounds : campgrounds} );
});

app.post("/campground",function(req,res) {
    var name = req.body.name;
    var url_image = req.body.image;
    var newCampground = {title : name, image : url_image}
    campgrounds.push(newCampground);
    // get data from form and add to array
    // redirect back to campground page
    res.redirect("/campground")
});

app.get("/campground/new", function(req,res) {
    res.render("new.ejs")
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YELPCamp server...") 
});