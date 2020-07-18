//Code will be executed in strict mode
'use strict';

//Imports for node modules
const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const http = require('http');
const https = require('https');
const http2 = require('http2');
const fs = require('fs');
const compression = require('compression')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');


//Constant for the express app
const app = express();

//Set app to use a pug interface to display pages
app.engine('pug', require('pug').__express)
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//Redirect HTTP to HTTPS,
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
//Handle requests for static files
app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//Define grid variable to store grid of items

//Add all the items in the json file to the grid

function showGalleries(){
	let grid = "";
	let photoList = JSON.parse(fs.readFileSync('photoList.json'));
	console.log(photoList);
	console.log(photoList.galleries[1]);
	let row = "";
	let count = 0;
	let colContents = ""
	for(let i = 0; i < photoList.galleries.length;i++){
		
		
		let col = '<div class="col s12 m4 l3"><div class="card"><div class="card-image"><img src="' + photoList.galleries[i].galleryImage + '"><span class="card-title">' + photoList.galleries[i].galleryTitle + '</span></div><div class="card-content"><p>'+ photoList.galleries[i].galleryDescription +'</p></div><div class="card-action"><a href="'+ "/" + photoList.galleries[i].galleryNumber +'">'+"Link to Gallery"+'</a></div></div></div>';
		console.log(col);
		colContents = colContents + col
		console.log(count);
		count = count + 1
		if(photoList.galleries.length < 4){
			console.log("Not enough galleries to display");
		}
		console.log(i);
		console.log(photoList.galleries.length);
		if(count >= 4 || i >= photoList.galleries.length-1){
			console.log("adding row");
			let row = '<div class = "row">' + colContents + '</div>';
			colContents = ""
			grid = grid + row;
			count = 0;
		}
		
	}
	
	
	return grid;
}

//Function to begin the server
function startServer() {

	let photoList = JSON.parse(fs.readFileSync('photoList.json'));

	app.get('/', function(req,res){
		res.render('index');
	});
	app.get('/galleries',function(req,res)
		{  
  			res.render('galleries', 
  				{
  					title:'Galleries', 
  					message:'This is the Galleries home page',
  					grid: showGalleries()
  				});
		});
	app.get('/prints',function(req,res)
		{  
  			res.render('prints', 
  				{
  					title:'Prints', 
  					message:'This is the Prints home page',
  				});
		});
	app.get('/about',function(req,res)
		{  
  			res.render('about', 
  				{
  					title:'About', 
  					message:'This is the About home page',
  				});
		});
	app.get('/contact',function(req,res)
		{  
  			res.render('contact', 
  				{
  					title:'Contact', 
  					message:'This is the Contact home page',
  				});
		});
	
	//Start the server on PORT 8080
	app.listen(process.env.PORT || 8080, function(){
  		console.log("Express server listening on port %d in %s mode", 
  			this.address().port, 
  			app.settings.env
  		);
	});
	
	for(let i = 0; i < photoList.galleries.length; i++){
		app.get('/' + photoList.galleries[i].galleryNumber,(req, res)=>{
			res.render('gallery',{
				title: photoList.galleries[i].galleryTitle,
				number: photoList.galleries[i].galleryNumber,
				description: photoList.galleries[i].galleryDescription,
				images: JSON.stringify(photoList.galleries[i].galleryImages)
				
			})
		});
	}
	
	
	
	}
	

//Start the server
startServer();
