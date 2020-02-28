var express = require("express");
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

// Schema SETUP 
var campSchema = new mongoose.Schema({
    title : String,
    image: String,
    description: String
});

var campground = mongoose.model("Campground", campSchema);

// campground.create({
//     title : "RV camp",
//     image : "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//     description: "Beautiful Sunset view. Romantic place"
//     }, function(err, camp){
//         if(err){
//             console.log("STH went Wrong")
//             console.log(err)
//         }else {
//             console.log("GOOD to GO")
//             console.log(camp)
//         }
//     });

    // var campgrounds = [
    //     {title : "RV camp", image : "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    //     {title : "Top site", image : "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    //     {title : "Ginnie Spring site", image : "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"}
    //     ];


app.get("/",function(req,res){
    res.send("This is Home page");
});

app.get("/land",function(req,res){
    res.render("landings");
});

app.get("/campground",function(req, res) {
    campground.find({},function(err,result){
        if(err){
            console.log(err)
            console.log("Something went WRONG...")
        }
        else {
            res.render("index", {campgrounds : result} );
        }
    });
   
});

app.post("/campground",function(req,res) {
    var name = req.body.name;
    var url_image = req.body.image;
    var desc = req.body.description;
    var newCampground = {title : name, image : url_image, description : desc}
    //campgrounds.push(newCampground);
    campground.create(newCampground,function (err, result ){
        if(err) {
            console.log("Something went wrong")
            console.log(err)
        }
        else {
            console.log("Everything is great")
            console.log(result)
            res.redirect("/campground")
        }
    });
    
    // get data from form and add to array
    // redirect back to campground page
    
});

app.get("/campground/new", function(req,res) {
    res.render("new")
});

// Show more info about campground
app.get("/campground/:id",function(req,res){
    // res.send("This is SHOW PAGE")
    campground.findById(req.params.id, function(err,result){
        if(err){
            console.log(err)
            console.log("Something went wrong")
        }
        else {
            //console.log(result.description)
            res.render("show", {campgrounds : result} );
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YELPCamp server...") 
});