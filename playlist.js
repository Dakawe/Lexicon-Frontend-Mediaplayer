let audio = new Audio();
let currentSong = null;
let playButtonSmall = null;
let pEndtime = document.getElementById("end-timer");
let pStarttime = document.getElementById("start-timer");
let currentTime = document.getElementById("current-time");

function play(self, css, song, imgSong) {
  console.log(self, css, song, imgSong);
  activeSong = document.querySelector(".songbox-live");
  activeSong ? activeSong.classList.remove("songbox-live") : null;
  self.classList.add(css);

  mainBackdrop = document.getElementById("m-player");
  imgAlbum = document.getElementById("playlist-album");
  pArtist = document.getElementById("playlist-artist");
  pAlbum = document.getElementById("playlist-song");

  mainBackdrop.style.backgroundImage = `url(${imgSong})`;
  imgAlbum.src = imgSong;
  pArtist.innerText = self.querySelector(".song-title").innerText;
  pAlbum.innerText = self.querySelector(".album-title").innerText;
  playButtonSmall ? (playButtonSmall.innerText = "play_circle") : null;
  playButtonSmall = self.querySelector(".play-icon");

  if (currentSong !== song) {
    audio.src = song;
    audio.currentTime = 0;
    currentSong = song;
  }

  playpause();
}

function playpause(self) {
  if (!currentSong) {
    play(document.getElementById("songbox-first"), "songbox-live", "rocket.mp3", "img-rocket-to-the-moon.jpg");
    return;
  }
  console.log(audio.paused);
  playButton = document.getElementById("play-pause");
  audio.paused ? playSong() : pauseSong();

  function playSong() {
    audio.play();
    playButton.innerText = "pause_circle";
    playButtonSmall.innerText = "pause_circle";
    console.log("playing", audio.duration);
  }
  function pauseSong() {
    audio.pause();
    playButton.innerText = "play_circle";
    playButtonSmall.innerText = "play_circle";
    console.log("playing", audio.duration);
  }

  function currentPlayTime() {
    x = audio.currentTime;
    y = audio.duration;
    pStarttime.innerText = formatTime(x);
    pEndtime.innerText = formatTime(y);

    currentTime.style.width = (x / y) * 100 + "%";
  }
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    return formattedTime;
  }

  setInterval(currentPlayTime, 1000);
}

function forward() {
  audio.currentTime += 25;
}
function rewind() {
  audio.currentTime -= 25;
}
