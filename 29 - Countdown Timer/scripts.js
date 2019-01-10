// Create countdown variable to assign setInterval to it, so that it can be cleared later

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('button[data-time]');

function timer(seconds) {
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	// Call display function immediately to display time remaining
	displayTimeLeft(seconds);

	// Call display end time to display now + seconds (then)
	displayEndTime(then);

	countdown = setInterval(() => {
		// Round into number of seconds to countdown
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		// Check to see if should stop Interval
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		// Display after each second down
		displayTimeLeft(secondsLeft);
	}, 1000);
}

// Create function so timer will display initial value

function displayTimeLeft(seconds) {
	// Calculate hours, minutes and seconds

	let hours = Math.floor(seconds / 3600);
	let leftoverSeconds = seconds % 3600;
	let minutes = Math.floor(leftoverSeconds / 60);
	leftoverSeconds = seconds % 60;

	// Make adjustments to display 2 digits 
	if (leftoverSeconds < 10) {
		leftoverSeconds = `0${leftoverSeconds}`;
	}

	const adjustedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	if (hours >= 0 && hours < 10) {
		hours = `0${hours}`
	}

	// Set doc title and countdown to display values 

	const display = `${hours}:${adjustedMinutes}:${leftoverSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
}

// Create function to display end time

function displayEndTime(timestamp) {
	// create new Date, hours, mins based on passed argument
	const end = new Date(timestamp);
	const hour = end.getHours();
	// adjust hour from military time (values = 0 or > 12);
	const adjustedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
	const minutes = end.getMinutes();
	const adjustedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
	// Set text to adjusted time
	endTime.textContent = `Return at ${adjustedHour}:${adjustedMinutes}`;
}

// Add event listeners to timer buttons to retrieve time data and set timer

buttons.forEach(button => {
	button.addEventListener('click', (e) => {
		console.log(e);
		let time = parseInt(e.target.dataset.time);
		timer(time);
	});
});

// Add event listener to input field to retrieve value and pass to timer function

document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	console.log(e);
	const mins = this.minutes.value;
	timer(this.minutes.value * 60);
	this.reset();
});



