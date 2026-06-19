const songs = [
  {
    artist: "Bless You",
    songName: "Driving",
    bg: "#f2f2f2",
    cover:
      "img/cover1.jpg",
    song:
      "music/song1.mp3"
  },
  {
    artist: "Linkin Park",
    songName: "In the end",
    bg: "#dfe8ff",
    cover:
      "img/İnTheEnd.jpg",
    song:
      "music/İnTheEnd.mp3"
  },
  {
    artist: "Adele",
    songName: "Hello",
    bg: "#ffe4dc",
    cover:
      "img/Hello.jpg",
    song:
      "music/Hello.mp3"
  }
];

const sliderImgs = document.querySelector(".slider__imgs");
const playlist = document.querySelector(".music-player__playlist");

const singerName = document.querySelector(".music-player__singer-name");
const subtitle = document.querySelector(".music-player__subtitle");

const playBtn = document.querySelector(
  ".music-player__broadcast-guarantor"
);

const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__bar");

const slider = document.querySelector(".slider");

let currentIndex = 0;
let currentAudio = null;
let isPlayed = false;
let isDragging = false;

function init() {
  createSlides();
  createPlaylist();

  updatePlayerInfo();
  setCurrentAudio();

  document.querySelector(".prev-btn")
    .addEventListener("click", prevSong);

  document.querySelector(".next-btn")
    .addEventListener("click", nextSong);

  playBtn.addEventListener("click", togglePlay);

  progress.addEventListener("pointerdown", startDrag);

  window.addEventListener("pointermove", dragProgress);

  window.addEventListener("pointerup", stopDrag);

  slider.addEventListener("click", handleResize);
}

function createSlides() {
  songs.forEach(song => {

    const img = document.createElement("img");

    img.className = "img";

    img.src = song.cover;

    sliderImgs.appendChild(img);
  });
}

function createPlaylist() {

  songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.className = "music-player__song";

    li.innerHTML = `
      <div class="flex-row _align_center">

        <img src="${song.cover}"
             class="img music-player__song-img">

        <div class="music-player__playlist-info text_trsf-cap">

          <b class="text_overflow">
            ${song.songName}
          </b>

          <div class="flex-row _justify_space-btwn">

            <span class="music-player__subtitle">
              ${song.artist}
            </span>

            <span class="music-player__song-duration"></span>

          </div>

        </div>

      </div>

      <audio src="${song.song}"></audio>
    `;

    const audio = li.querySelector("audio");

    audio.addEventListener("loadedmetadata", () => {

      const duration = formatTime(audio.duration);

      li.querySelector(".music-player__song-duration")
        .textContent = duration;
    });

    audio.addEventListener("timeupdate", updateProgress);

    li.addEventListener("click", () => {

      changeSong(index);
    });

    playlist.appendChild(li);
  });
}

function setCurrentAudio() {

  currentAudio = playlist.querySelectorAll("audio")[currentIndex];
}

function updatePlayerInfo() {

  singerName.innerHTML =
    `<div>${songs[currentIndex].artist}</div>`;

  subtitle.innerHTML =
    `<div>${songs[currentIndex].songName}</div>`;

  document.body.style.background =
    songs[currentIndex].bg;

  sliderImgs.style.transform =
    `translate3d(${-currentIndex * 100}%,0,0)`;
}

function togglePlay() {

  playBtn.classList.toggle("click");

  isPlayed = !isPlayed;

  if (currentAudio.paused) {
    currentAudio.play();
  } else {
    currentAudio.pause();
  }
}

function changeSong(index) {

  if (index < 0 || index >= songs.length) return;

  currentAudio.pause();

  currentAudio.currentTime = 0;

  currentIndex = index;

  setCurrentAudio();

  updatePlayerInfo();

  if (isPlayed) {
    currentAudio.play();
  }
}

function nextSong() {

  if (currentIndex >= songs.length - 1) return;

  changeSong(currentIndex + 1);
}

function prevSong() {

  if (currentIndex <= 0) return;

  changeSong(currentIndex - 1);
}

function updateProgress() {

  const percent =
    (currentAudio.currentTime / currentAudio.duration) * 100;

  progressBar.style.setProperty(
    "--width",
    `${percent}%`
  );

  if (
    currentAudio.currentTime >= currentAudio.duration
  ) {

    nextSong();
  }
}

function startDrag(e) {

  isDragging = true;

  setProgress(e);
}

function dragProgress(e) {

  if (!isDragging) return;

  setProgress(e);
}

function stopDrag() {

  isDragging = false;
}

function setProgress(e) {

  const rect = progress.getBoundingClientRect();

  const percent =
    (e.clientX - rect.left) / rect.width;

  currentAudio.currentTime =
    percent * currentAudio.duration;
}

function handleResize(e) {

  if (
    e.target.classList.contains("music-player__info")
  ) {

    slider.classList.add("resize");

    slider.style.setProperty(
      "--controls-animate",
      "down running"
    );
  }

  if (
    e.target.classList.contains(
      "music-player__playlist-button"
    )
  ) {

    slider.classList.remove("resize");

    slider.style.setProperty(
      "--controls-animate",
      "up running"
    );
  }
}

function formatTime(time) {

  let min = Math.floor(time / 60);

  let sec = Math.floor(time % 60);

  if (min < 10) min = "0" + min;

  if (sec < 10) sec = "0" + sec;

  return `${min}:${sec}`;
}

init();