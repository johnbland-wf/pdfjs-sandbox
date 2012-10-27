pdfjs-sandbox
=============

Toying w/ PDF.js

### Viewing
You can run this in your browser via localhost by making a symlink to the cloned folder:

    $ cd ~/
    $ git clone git://github.com/johnbland-wf/pdfjs-sandbox.git && cd pdfjs-sandbox
    $ ln -s ~/pdfjs-sandbox/ /Library/WebServer/Documents/pdfjs-sandbox
    $ open http://localhost/pdfjs-sandbox/loading-per-page

Open Chrome Dev Tools -> Network to see the chunks for 'tracemonkey.pdf'.

Note:
The PDF url is hardcoded so the folder names must stay intact OR simply go into loading-per-page/js/loadingperpage.js and change this line:

    loadPDF("http://localhost/pdfjs-sandbox/pdfs/tracemonkey.pdf");