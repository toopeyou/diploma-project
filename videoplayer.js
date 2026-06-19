document.addEventListener('DOMContentLoaded', function() {
const video = document.getElementById('video');
const playPauseBtn = document.querySelector('.play-pause');
const progress = document.querySelector('.progress');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const muteBtn = document.querySelector('.mute');
const volume = document.querySelector('.volume');
const fullscreenBtn = document.querySelector('.fullscreen');
const videoContainer = document.querySelector('.video-container');
playPauseBtn.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = '❚❚';
        playPauseBtn.title = 'Pause';
    } else {
        video.pause();
        playPauseBtn.textContent = '▶';
        playPauseBtn.title = 'Play';
    }
}

video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    currentTime.textContent = formatTime(video.currentTime);
}

function setProgress() {
    video.currentTime = (progress.value * video.duration) / 100;
}
video.addEventListener('loadedmetadata', function() {
    duration.textContent = formatTime(video.duration);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

muteBtn.addEventListener('click', toggleMute);
volume.addEventListener('input', setVolume);

    function toggleMute() {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? '🔇' : '🔊';
        muteBtn.title = video.muted ? 'Unmute' : 'Mute';
        volume.value = video.muted ? 0 : video.volume;
    }

function setVolume() {
    video.volume = volume.value;
    video.muted = volume.value === '0';
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
    muteBtn.title = video.muted ? 'Unmute' : 'Mute';
}

fullscreenBtn.addEventListener('click', toggleFullscreen);
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
            videoContainer.classList.add('fullscreen');
        } else {
            document.exitFullscreen();
            videoContainer.classList.remove('fullscreen');
        }
    }



document.addEventListener('keydown', function(e) {
        if (e.target.tagName.toLowerCase() === 'input') return;

        switch (e.key) {
            case ' ':
            case 'k':
                togglePlayPause();
                break;
            case 'm':
                toggleMute();
                break;
            case 'f':
                toggleFullscreen();
                break;
            case 'c':
                
                break;
            case 'ArrowLeft':
                video.currentTime = Math.max(0, video.currentTime - 5);
                break;
            case 'ArrowRight':
                video.currentTime = Math.min(video.duration, video.currentTime + 5);
                break;
            case 'ArrowUp':
                video.volume = Math.min(1, video.volume + 0.1);
                volume.value = video.volume;
                break;
            case 'ArrowDown':
                video.volume = Math.max(0, video.volume - 0.1);
                volume.value = video.volume;
                break;
        }
    });
});
