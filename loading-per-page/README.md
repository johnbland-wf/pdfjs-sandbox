Loading Pages
=============

Toying w/ PDF.js

### Viewing
[initial setup required; see root/README.md]

    $ open http://localhost/pdfjs-sandbox/loading-per-page

Open Chrome Dev Tools -> Network to see the chunks for 'tracemonkey.pdf'.

Note:
The PDF url is hardcoded so the folder names must stay intact OR simply go into loading-per-page/js/loadingperpage.js and change this line:

    loadPDF("http://localhost/pdfjs-sandbox/pdfs/tracemonkey.pdf");