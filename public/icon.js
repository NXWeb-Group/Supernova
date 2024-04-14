if(localStorage.getItem("icon") == null){
  localStorage.setItem("icon", "/pics/favicon/google.png");
}
if(localStorage.getItem("title") == null){
  localStorage.setItem("title", "Google");
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

changeFavicon(localStorage.getItem("icon"));
document.title = localStorage.getItem("title");

function icon(stuff) {
  localStorage.setItem("icon", stuff);
    changeFavicon(localStorage.getItem("icon"));
};

function changeTitle() {
  let stuff = document.getElementById('titleText').value;
  localStorage.setItem("title", stuff);
  document.title = localStorage.getItem("title");
}