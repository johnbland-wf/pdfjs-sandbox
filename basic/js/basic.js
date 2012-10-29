/**
 * Basic viewer for loading a single PDF
 */

'use strict';

PDFJS.workerSrc = '../js/pdf.js';

var parameters = {url: "http://localhost/pdfjs-sandbox/pdfs/tracemonkey.pdf"}
PDFJS.getDocument(parameters).then(
	function(pdf){
		pdf.getPage(1).then(
			function(page){
				var viewport = page.getViewport(2, 0); //font scale, rotation
				// Prepare canvas using PDF page dimensions
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
			}, 
			function(error){
				log("Nom nom!", error);
			});
	}, function(error){
		log("Error swallowed whole!", error);
	}, function(progressData){
		console.log("Loading", Math.round(progressData.loaded/progressData.total)*100, "%");
	});