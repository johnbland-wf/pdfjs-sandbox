/**
 * Loads one page and outputs the character metrics
 * (not the most optimal of code; just a sample)
 */

'use strict';

PDFJS.workerSrc = '../js/pdf.js';

var pdf;
var page;
var pageNumber;

function loadPDF(url){
	var parameters = {url: url};
	PDFJS.getDocument(parameters).then(function(newPdf) {
		pdf = newPdf;
		getPage();
	}, function(error){
		log("Error swallowed whole!", error);
	}, function(progressData){
		console.log("Loading", Math.round(progressData.loaded/progressData.total)*100, "%");
	});
}

function getPage(){
	if(!pdf) throw new Error("Get the PDF first, DUH!");
	try{
		log("Loading page 1");
		pdf.getPage(1).then(function(newPage){
			page = newPage;
			
			var viewport = page.getViewport(2, 0);
			
			var canvas = document.getElementById('the-canvas');
			var context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			// Render PDF page into canvas context
			var renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			page.render(renderContext).then(function(){
				dumpMetrics();
			});
		}, function(error){
			log("Nom nom!", error);
		});
	}catch(err){
		log("Errrrrrrrrrr", err);
	}
}

function dumpMetrics(){
	console.profile("Metrics");
	console.log("Dumping metrics");
	var list = page.operatorList;
	var fnArray = list.fnArray;
	var argsArray = list.argsArray;
	var len = fnArray.length;
	var fn;
	var args;
	var output = "[";
	for(var i = 0; i < len; i++){
		fn = fnArray[i];
		args = argsArray[i].toString();
		if(fn == "dependency"){ //these are things like fonts
			continue;
		}else{
			output += "{\"name\":" + JSON.stringify(fn);
			if(args.length > 0)
				output += ",\"args\":" + JSON.stringify(args) + "}";
			else
				output += "}";

			if(i+1 != len) output += ",";
		}
	}
	output += "]";
	console.profileEnd();
	console.debug(output);//log it outside of the profile so it doesn't count
}

function log(line){
	if(console) console.log(arguments);
}

$(function(){
	loadPDF("http://localhost/pdfjs-sandbox/pdfs/tracemonkey.pdf");
});