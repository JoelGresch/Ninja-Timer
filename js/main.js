
const app = document.getElementById("app");
const bell = document.getElementById("bell");


// app.onclick = function(event) {
// 	if (event.target === this) {
// 		timerList.push(new Timer());
//     }
// }

let timerList = [];

function formatNumber(input) {
    let value = input.value;

    // Ensure it's a valid number and within 0-99 range
    value = Math.max(0, Math.min(59, parseInt(value) || 0));

    // Format to two digits with leading zero
    input.value = value.toString().padStart(2, "0");
	
}

function addTimer(btn) {
	timerList.push(new Timer());
	timerList[timerList.length-1].elem.querySelector(".timer-label").focus();
	// const newParent = document.querySelector('#new-parent');
	app.appendChild(btn);
}

function Timer() {
	const self = this;
	
	// Define timer template
	self.template = `
			<input type="text" class="timer-label" placeholder="Name" onkeydown="if(event.key==='Enter') this.blur();">
			
			<div class="timer-controls">
				<div class="timer-display">
					<input class="timer-minutes timer-digits" type="number" value="" max="59" placeholder="00" min="0" oninput="formatNumber(this)" onchange="formatNumber(this)" onkeydown="if(event.key==='Enter') this.blur();">:
					<input class="timer-seconds timer-digits" type="number" value="" max="59" placeholder="00" min="0" oninput="formatNumber(this)" onchange="formatNumber(this)" onkeydown="if(event.key==='Enter') this.blur();">
				</div>
				
				<div class="timer-buttons">
					<button class="start-btn control-btn">▶</button>
					<button class="pause-btn control-btn">❚❚</button>
					<button class="stop-btn control-btn">◼</button>
				</div>
			</div>
			<button class="remove-btn">Remove</button>
		`;
	
	// Create element from template
	self.elem = document.createElement('div');
	self.elem.className = "timer ";
	self.elem.innerHTML = self.template.trim();
	app.appendChild(self.elem);
	
	// Define Timer object properties
	self.ticker;
	self.startTime;
	self.endTime;
	self.minutes = self.elem.querySelector(".timer-minutes");
	self.seconds = self.elem.querySelector(".timer-seconds");
	self.label = self.elem.querySelector(".timer-label");
	
	
	
	// Define Timer object methods
	self.start = ()=> {
		if ((self.minutes.value > 0 || self.seconds.value > 0) && self.ticker == null) {
			console.log(`${self.label.value} timer started at ${new Date().toLocaleTimeString()}`);
			self.label.disabled = true;
			self.minutes.disabled = true;
			self.seconds.disabled = true;
			self.startTime = new Date().getTime();
			self.endTime = new Date().getTime() + self.minutes.value*60*1000 + self.seconds.value*1000;
			
			self.ticker = setInterval(self.tick, 100);
		}
	}
	
	self.pause = ()=> {
		if (self.ticker != null) {
			clearInterval(self.ticker);
			self.ticker = null;
			self.label.disabled = false;
			self.minutes.disabled = false;
			self.seconds.disabled = false;
			console.log(`${self.label.value} timer paused at ${new Date().toLocaleTimeString()}`);
		}
	}
	
	self.stop = ()=> {
		clearInterval(self.ticker);
		self.ticker = null;
		self.label.disabled = false;
		self.minutes.disabled = false;
		self.seconds.disabled = false;
		self.minutes.value = "";
		self.seconds.value = "";
		self.elem.classList.remove("alarm");
		self.minutes.classList.remove("alarm");
		self.seconds.classList.remove("alarm");
		console.log(`${self.label.value} timer stopped at ${new Date().toLocaleTimeString()}`);
	}
	
	self.tick = ()=> {
		self.minutes.value = Math.floor((self.endTime - new Date().getTime())/1000/60);
		self.seconds.value = Math.floor(((self.endTime - new Date().getTime())/1000)%60);
		formatNumber(self.minutes);
		formatNumber(self.seconds);
		if (self.minutes.value == 0 && self.seconds.value == 0) {
			self.stop();
			self.elem.classList.add("alarm");
			self.minutes.classList.add("alarm");
			self.seconds.classList.add("alarm");
			bell.load();
			bell.play();
		}
	}
	
	self.remove = ()=> {
		if (self.label.value != "" ? confirm(`Remove timer for ${self.label.value}?`) : confirm(`Remove timer?`)) {
			self.stop();
			self.elem.remove();
			timerList = timerList.splice(timerList.indexOf(self), 1);
		}
		// console.log(self.elem);
	}
	
	// Connect Timer buttons to Timer object methods
	self.elem.querySelector(".start-btn").onclick = self.start;
	self.elem.querySelector(".pause-btn").onclick = self.pause;
	self.elem.querySelector(".stop-btn").onclick = self.stop;
	self.elem.querySelector(".remove-btn").onclick = self.remove;
	
}



// let minutes = document.getElementsByClassName("timer-minutes")[0];
// let seconds = document.getElementsByClassName("timer-seconds")[0];

// setInterval(() => {
// 	seconds.value--;
// 	seconds.value = String(seconds.value).padStart(2, "0");
// 	if (seconds.value < 0) {
// 		seconds.value = 59;
// 		minutes.value--;
// 	}
// }, 1000)


