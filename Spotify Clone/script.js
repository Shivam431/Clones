console.log("writing javascript code");
let currentSong = new Audio();

function formatSecondsToMinutesAndSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
}

const minutes = Math.floor(seconds / 60);
const remainingSeconds = Math.floor(seconds % 60);

const formattedMinutes = String(minutes).padStart(2, '0');
const formattedSeconds = String(remainingSeconds).padStart(2, '0');

return `${formattedMinutes}:${formattedSeconds}`;
}

// let play=document.getElementById("play")
// console.log(play)
async function getSongs() {
  let response = await fetch(
    "http://127.0.0.1:5500/Spotify%20Clone/assests/songs/"
  );

  let data = await response.text();

  let div = document.createElement("div");

  div.innerHTML = data;

  let a = div.getElementsByTagName("a");

  let songs = [];

  for (let index = 0; index < a.length; index++) {
    const element = a[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("songs/")[1]);
    }
  }

  return songs;
}

const playMusic = (song, pause=false) => {

  currentSong.src = "/Spotify%20Clone/assests/songs/" + song;
  if(!pause){

    currentSong.play();
    play.src = "/Spotify%20Clone/assests/pause.svg";
  }

  // console.log(Spotify%20Clone/assests/playSong.svg)
  document.querySelector(".songinfo").innerHTML=decodeURI(song);
    
}

async function main() {
  let songs = await getSongs();
  playMusic(songs[0],true)

  console.log(songs);
  let SongsUL = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];

  for (const song of songs) {
    SongsUL.innerHTML =
      SongsUL.innerHTML +
      `<li>
        <img
                  class="invert"
                  src="./assests/music.svg"
                  alt="music-icon"
                />
                <div class="info">
                  <div> ${song.replaceAll("%20", " ")}</div>
                  <div>Shivam</div>
                </div>
                <div class="playNow">
                  <span>Play Now</span>
                  <img
                    src="./assests/playSong.svg"
                    alt="play-icon"
                    class="invert"
                  />
                </div> 
         </li>`;
  }

  console.log(SongsUL);
  //play the first song
  //attacd eventlistner to all songs

  Array.from(
    document.querySelector(".songsList").getElementsByTagName("li")
  ).forEach((ele) => {
    ele.addEventListener("click", (event) => {
      playMusic(ele.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  // Attach an event listener to play, next and previous
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "/Spotify%20Clone/assests/pause.svg";
    } else {
      currentSong.pause();
      play.src = "/Spotify%20Clone/assests/playSong.svg";
    }
  });

  //event listner to update time of te current song

  currentSong.addEventListener("timeupdate",()=>{
    console.log(currentSong.currentTime, currentSong.duration)
    let formattedTime = formatSecondsToMinutesAndSeconds(currentSong.currentTime)

    console.log(formattedTime)
    document.querySelector(".songtime").innerHTML=`${formatSecondsToMinutesAndSeconds(currentSong.currentTime)}/${formatSecondsToMinutesAndSeconds(currentSong.duration)}`;

    document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 +"%";
  })


  //event lisntner to update seekbar 
  document.querySelector(".seekBar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100
})
}

main();
