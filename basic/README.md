Basic Viewing
=============

This shows the basics of loading a PDF and immediately rendering page 1.


### Viewing
[initial setup required; see root/README.md]

    $ open http://localhost/pdfjs-sandbox/basic

Note:
The PDF url is hardcoded so the folder names must stay intact OR simply go into basic/js/basic.js and change this line:

    var parameters = {url: "http://localhost/pdfjs-sandbox/pdfs/tracemonkey.pdf"}