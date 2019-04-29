

const apiKey = 'af415535aa9cd1efc6120da0109b10c9';
const source = 'the-washington-post';

var q_artist = '';
var q_track = '';

function Click() {
        $('#lyricsDiv').empty();
        $('#Artistname').empty();
        var search = document.querySelector('#search').value
        var search2 = document.querySelector('#search2').value;
        q_track = search;
        q_artist = search2;

        $('#spinner').show();
        updateLyrics();
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
      navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(err => 'SW registration failed'));
  }

  window.addEventListener('load', e => {
    //updateLyrics();
  });

  $('#lyricsDiv').text(function (_,txt) {
    return txt.slice(0, -50);
  });

  async function updateLyrics() {
    
    //const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
    
    //const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin%20bieber&page_size=3&page=1&s_track_rating=desc&apikey=${apiKey}`);
    const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${q_track}&q_artist=${q_artist}&apikey=af415535aa9cd1efc6120da0109b10c9`);
    
    const json = await response.json();
    $('#spinner').hide();
    //console.log(json.message.body.lyrics.lyrics_body);
    
    var b = document.querySelector('#lyricsDiv');
    var c = document.querySelector('#Artistname');

    
      c.innerHTML = q_artist + " - " + q_track;
      
      b.innerHTML = json.message.body.lyrics.lyrics_body;
      //b.textContent.slice(0,-10);
   
    

    var res = $('#lyricsDiv').contents().map(function () {
      if (this.nodeType == 3 && this.nodeValue.trim() != "") //check for nodetype text and ignore empty text nodes
      return this.nodeValue.trim().split(/\W+/); //split the nodevalue to get words.
  }).get(); //get the array of words.
  
  var new_content = [];
  $.each(res, function (index, value) {
      index++;
      if (index % 8 === 0) {
          new_content.push(value + '<br/>');
      } else {
          new_content.push(value);
      }
  
  
  });
  
  $('#lyricsDiv').html(new_content.join(' '));
    
  }
  
  

 