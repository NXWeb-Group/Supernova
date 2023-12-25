const cookie = (name) => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();

if (cookie('icon') == ''){
  document.cookie = 'icon=/pics/favicon/google.png';
}
if (cookie('title') == ''){
  document.cookie = 'title=Google';
}

function changeFavicon(url) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const existingFavicon = document.getElementById('dynamic-favicon');
  
    if (existingFavicon) {
      head.removeChild(existingFavicon);
    }
  
    const newFavicon = document.createElement('link');
    newFavicon.id = 'dynamic-favicon';
    newFavicon.rel = 'icon';
    newFavicon.href = url;
  
    head.appendChild(newFavicon);
  };

changeFavicon(cookie('icon'));
document.title = cookie('title');

function icon(stuff) {
    document.cookie = 'icon=' + stuff;
    changeFavicon(cookie('icon'));
};

function changeTitle() {
  document.cookie = 'title=' + document.getElementById('titleText').value;
  document.title = cookie('title');
}