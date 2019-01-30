function playSound(e) {
	let key = e.keyCode;
  	const audio = document.querySelector(`audio[data-key="${key}"]`);
  	const button = document.querySelector(`.key[data-key="${key}"]`);
  	if (!audio) return;
  	audio.currentTime = 0;
  	audio.play();
  	button.classList.toggle('playing');
}

function toggleClass(e) {
  	const button = document.querySelector(`div[data-key="${e.keyCode}"]`);
  	button.classList.toggle('playing');
}

window.addEventListener('keydown', playSound);





window.addEventListener('keyup', toggleClass); 

