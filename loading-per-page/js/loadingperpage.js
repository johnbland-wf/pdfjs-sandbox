'use strict';

PDFJS.workerSrc = '../js/pdf.js';

var pdf;
var page;
var pageNumber;
var fontScale;
var rotation;

function loadPDF(url){
	PDFJS.getDocument(url).then(function(newPdf) {
		pdf = newPdf;
		getPage(1, 2);
		//set max length for input
		$(".pageForm input").attr("maxlength", pdf.numPages.toString().length);
		$(".pageForm input").attr("max", pdf.numPages);
	}, function(error){
		log("Error swallowed whole!", error);
	}, function(progressData){
		console.log("Loading", Math.round(progressData.loaded/progressData.total)*100, "%");
	});
}

function getPage(newPageNumber, newFontScale, newRotation){
	if(!pdf) throw new Error("Get the PDF first, DUH!");
	try{
		if(fontScale == undefined || newFontScale != fontScale)
			fontScale = newFontScale ? newFontScale : 2;
		if(rotation == undefined || newRotation != rotation)
			rotation = newRotation ? newRotation : 0;
		if(newPageNumber == pageNumber){
			renderPage(rotation);
			return;
		}else if(newPageNumber > pdf.numPages){
			newPageNumber = 1;
		}else if(newPageNumber < 1){
			newPageNumber = pdf.numPages;
		}
		pageNumber = newPageNumber;
		log("Loading", pageNumber);
		pdf.getPage(newPageNumber).then(function(newPage){
			page = newPage;
			updatePageNumber();
			renderPage(fontScale, rotation);
		}, function(error){
			log("Nom nom!", error);
		});
	}catch(err){
		log("Errrrrrrrrrr", err);
	}
}

function renderPage(){
	var viewport = page.getViewport(fontScale, rotation ? rotation : 0);
	
	// Prepare canvas using PDF page dimensions
	// NOTE: To render multiple pages, create a new div and canvas
	var canvas = document.getElementById('the-canvas');
	var context = canvas.getContext('2d');
	canvas.height = viewport.height;
	canvas.width = viewport.width;

	// Render PDF page into canvas context
	var renderContext = {
		canvasContext: context,
		viewport: viewport
	};
	page.render(renderContext);
}

function updatePageNumber(){
	$(".pageNumber").html(pageNumber + "/" + pdf.numPages);
	$(".pageNumber").show("fast").css("display", "inline-block");
	$(".pageForm input").val(pageNumber);
}

function log(line){
	//if(console) console.log(arguments);
}

$(function(){
	loadPDF("../pdfs/tracemonkey.pdf");

	//wire controls
	$("#controls .prev").click(function(){
		getPage(pageNumber-1);
	})
	$("#controls .next").click(function(){
		getPage(pageNumber+1);
	})

	$(".pageForm input").change(function(){
		var num = parseInt($(this).val().trim().toString());
		if(isNaN(num)) num = 1;
		getPage(num);
	});
});