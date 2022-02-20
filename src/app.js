const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const geoCode = require("./utils/geocode")
const foreCast = require("./utils/forecast")

//define path for express config
const publicDirPath = path.join(__dirname,"..","public")
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get("",(req,res)=>{
  res.render("index",{
    title:"Weather app",
    name:"Midhun p k"
  })
})

app.get("/about",(req,res)=>{
  res.render("about",{
    title:"About",
    name:"Midhun p k"
  })
})

app.get("/help",(req,res)=>{
  res.render("help",{
    title:"Help",
    name:"Midhun p k",
    message:"This is a page to help you!"
  })
})

app.get("/weather",(req,res)=>{
  if(!req.query.address){
   return res.send({
      error:"You must provide an address"
    })
  }
  console.log(req.query.address)
  geoCode(req.query.address, (error, {latitude,longitude,location} = {}) => {
    if(error){
      return res.send({
        error
      })
    }
    foreCast(latitude,longitude,(error,forecastData) => {
      if(error){
      return res.send({
        error
      })
      }
      res.send({
        location:location,
        forecast:forecastData,
        address:req.query.address
      })
    })
  })
  // res.send({
  //   location:"New york",
  //   forcast:"50 degree farhenheat",
  //   address:req.query.address
  // })
})

app.get("/products",(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:"You must provide a search term"
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get("/help/*",(req,res)=>{
  res.render("404",{
    title:404,
    name:"Midhun p k",
    errorMessage:"Help article not found"
  })
})

app.get("*",(req,res)=>{
  res.render("404",{
    title:404,
    name:"Midhun p k",
    errorMessage:"Page not found"
  }) 
})

app.listen(3000,()=>{
  console.log("The server is running...")
})