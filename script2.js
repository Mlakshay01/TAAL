document.addEventListener("DOMContentLoaded", function () {
    const audioElement = new Audio();
    const masterPlay = document.getElementById("masterPlay");
    const progressBar = document.getElementById("myProgressBar");
    const gif = document.getElementById('gif');
    const masterSongName = document.getElementById("masterSongName");
    const songList = document.querySelector(".songList");
    const currentTimeElement = document.getElementById("currentTime"); // Replace with actual element ID
    const durationElement = document.getElementById("duration"); // Replace with actual element ID

    const songs = [
        { songName: "Daru-Badnaam", filePath: "songs/1.mp3", coverPath: "covers/COVER-Daru-Badnam.jpg", duration: 334 },
        { songName: "Gangland", filePath: "songs/2.mp3", coverPath: "covers/COVER-Gangland.jpg", duration: 280 },
        { songName: "Dope-Shop", filePath: "songs/3.mp3", coverPath: "covers/COVER-Dope Shop.jpg", duration: 216 },
        { songName: "Falak Tak", filePath: "songs/4.mp3", coverPath: "covers/COVER-Falak Tak.jpg", duration: 292 },
        { songName: "Roz Roz", filePath: "songs/5.mp3", coverPath: "covers/COVER-Roz Roz.jpg", duration: 225 },
        // Add more songs here
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }

    function updateProgressBar() {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = progress;
    }

    function updateSongTimeDisplay() {
        currentTimeElement.textContent = formatTime(audioElement.currentTime);
        durationElement.textContent = formatTime(audioElement.duration);
    }

    function updatePlayPauseIcon() {
        if (isPlaying) {
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        } else {
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }
    }

    function playSong(index) {
        if (index >= 0 && index < songs.length) {
            audioElement.src = songs[index].filePath;
            masterSongName.textContent = songs[index].songName;
            audioElement.play();
            isPlaying = true;
            updatePlayPauseIcon();
            updateSongTimeDisplay();
        }
    }

    function togglePlayPause() {
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        isPlaying = !isPlaying;
        updatePlayPauseIcon();
    }

    masterPlay.addEventListener("click", togglePlayPause);

    audioElement.addEventListener("timeupdate", () => {
        updateProgressBar();
        updateSongTimeDisplay();
    });

    progressBar.addEventListener("input", () => {
        audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
        updateSongTimeDisplay();
    });

    songList.addEventListener("click", (event) => {
        if (event.target.classList.contains("songItemPlay")) {
            const index = parseInt(event.target.id);
            if (index !== currentSongIndex) {
                playSong(index);
                currentSongIndex = index;
            } else {
                togglePlayPause();
            }
        }
    });

    document.getElementById("previous").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    document.getElementById("next").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });

    // Initialize the UI and play the first song
    updatePlayPauseIcon();
    updateSongTimeDisplay();
    initializeUI();
    playSong(currentSongIndex);
});
