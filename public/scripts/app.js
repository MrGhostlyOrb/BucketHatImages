//Execute code in strict method
'use strict';

function getImages(){
	let imageJSON = JSON.parse(document.getElementById('images').innerHTML);
	
	
}

function showImages(){
	let imageJSON = JSON.parse(document.getElementById('images').innerHTML);
	let count = 0;
	let cols = "";
	let rows = "";
	console.log(imageJSON.length);
	for(let i = 0; i < imageJSON.length; i++){
		let div = '<div class = "col s12 m4 l3"><div class="card"><div class="card-image"><img src="' + imageJSON[i].imageURL + '"><span class="card-title">Title</span></div></div></div>';
		cols = cols + div;
		console.log(cols);
		count = count + 1;
		if(count >= 4 || i >= imageJSON.length-1){
			rows = rows + "<div class = row>" + cols + "</div>"
			console.log(rows);
			cols = "";
			count = 0;
		}
	}
	let add = document.createElement('div');
	add.innerHTML = rows;
	console.log(add);
	document.body.appendChild(add);
}

getImages();
showImages();

