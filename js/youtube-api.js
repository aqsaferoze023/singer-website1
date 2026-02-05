const API_KEY = 'AIzaSyCrU3m05g0Jgs29zblK-BzdaMqKYbAtbM0';
const CHANNEL_ID = 'UCRvSM5dQ41y41IHAkA8mlXA';
const MAX_RESULTS = 6;

// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.getElementById('youtube-videos');

  if (!videoContainer) {
    console.error('Div with id "youtube-videos" not found!');
    return;
  }

  fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`)
    .then(response => response.json())
    .then(data => {
      videoContainer.innerHTML = ''; // Clear old content
      data.items.forEach(item => {
        if (item.id.kind === 'youtube#video') {
          const videoDiv = document.createElement('div');
          videoDiv.style.display = 'inline-block';
          videoDiv.style.margin = '5px';
          videoDiv.innerHTML = `<iframe width="300" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" title="${item.snippet.title}" frameborder="0" allowfullscreen></iframe>`;
          videoContainer.appendChild(videoDiv);
        }
      });
    })
    .catch(error => console.error('Error fetching videos:', error));
});
