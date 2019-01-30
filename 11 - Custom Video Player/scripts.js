/* Get our elements */

const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');

const ranges = player.querySelectorAll('.player__slider');

const fullButton = player.querySelector('#fullscreen');

/* Build functions */

function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function changeButton() {
	if (this.paused) {
		toggle.textContent = '►'
	} else {
		toggle.textContent = '❚ ❚';
	}
}

function skip() {
	const skipNumber = this.dataset.skip;
	console.log(skipNumber);
	video.currentTime += parseFloat(skipNumber);
}

function handleRangeUpdate() {
	console.log(`Update the ${this.name} to ${this.value}`);
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}


function scrub(e) {
	let playerWidth = parseInt(window
		.getComputedStyle(player)
		.getPropertyValue('width')
		.split('px')[0]);
	const percent = e.offsetX / playerWidth;
	video.currentTime = parseFloat(video.duration * percent);
}

// Fullscreen(ish) button function 

function handleScreen() {
	let maxWidth = window.screen.width;
	let minWidth = window.innerWidth;
	if (fullscreenFlag === false) {
		console.log('maximizing!');
		player.style.maxWidth = `100%`;
		player.style.width = `${maxWidth}px`;
		fullscreenFlag = true;
	} else {
		console.log('minimizing!');
		player.style.maxWidth = `750px`;
		player.style.width = `${minWidth}`;
		fullscreenFlag = false;
	}
}

/* Hook up event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', changeButton);
video.addEventListener('pause', changeButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(function(button) {
	button.addEventListener('click', skip);
});

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let progressFlag = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
	if (progressFlag) {
		scrub(e);
	}
});
progress.addEventListener('mousedown', () => progressFlag=true);
progress.addEventListener('mouseup', () => progressFlag = false);

// Fullscreen(ish) button handler

let fullscreenFlag = false;

fullButton.addEventListener('click', handleScreen);


