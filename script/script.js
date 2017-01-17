"use strict";

var Mas = {
	sequenceLength: 0,
	intervalID: 0,
	changeCounter: 1,
	changePercent: 0,
	changeExponential: true,
	secret: 0,
	secretTwo: 0,
	active: "starting value",

	init: function() {
		Mas.eventSetter();
	},

	eventSetter: function() {
		//Setts eventlisteners on all card img's
		Nodes.heartCard.addEventListener("click", function(e){
			e.preventDefault();
			Mas.active = "heart";
			Mas.displayActual("heart");
		});
		Nodes.cloveCard.addEventListener("click", function(e){
			e.preventDefault();
			Mas.active = "clove";
			Mas.displayActual("clove");
		});
		Nodes.diamondCard.addEventListener("click", function(e){
			e.preventDefault();
			Mas.active = "diamond";
			Mas.displayActual("diamond");
		});
		Nodes.spadeCard.addEventListener("click", function(e){
			e.preventDefault();
			Mas.active = "spade";
			Mas.displayActual("spade");
		});
	},

	displayTimer: function() {
		Mas.sequenceLength -= 1;
		Nodes.timer.innerHTML = Mas.sequenceLength;

		if(Mas.sequenceLength === 5) {
			Mas.playSound("clock");
		}

		if(Mas.sequenceLength === 0) {
			Mas.change();

			Mas.sequenceLength = Nodes.interval.value;
			Mas.sequenceLength++;
		}

	},

	displayActual: function(card) {
		Mas.sequenceLength = Nodes.interval.value;
		Mas.sequenceLength++;

		Mas.changePercent = Nodes.probability.value;
		Mas.changeExponential = Nodes.exponential.checked;

		//hide choose div
		Nodes.choose.className = "hide";

		//clears interval to make sure only one interval is running
		clearInterval(Mas.intervalID);

		//create img element that will show actual card
		var cardImage = document.createElement("img");
		cardImage.id = "choosencard";
		cardImage.src = "pics/" + card + ".png";

		//attach card to actual div
		Nodes.actual.appendChild(cardImage);

		//(re)starts interval
		Mas.intervalID = window.setInterval(Mas.displayTimer, 1000);

		//Displays percent div and starting 00 for timer
		Nodes.chance.innerHTML = Mas.changeCounter * Mas.changePercent + "%";
		Nodes.timer.innerHTML = "00";
		Mas.playAgain();
	},

	change: function() {
		//randomize number in interval 1-100
		Mas.secret = Math.floor( Math.random() * 100)+1;

		if (Mas.secret <= Mas.changeCounter * Mas.changePercent) {

			Mas.playSound("alarm");
			Mas.secretTwo = Math.floor( Math.random() * 100)+1;
			
			if(Mas.secretTwo > 0 && Mas.secretTwo < 26 && Mas.active !== "heart") {
				Mas.changeCard("heart");
				alert

			} else if(Mas.secretTwo > 25 && Mas.secretTwo < 51 && Mas.active !== "clove") {
				Mas.changeCard("clove");

			} else if(Mas.secretTwo > 50 && Mas.secretTwo < 76 && Mas.active !== "diamond") {
				Mas.changeCard("diamond");

			} else if(Mas.secretTwo > 76 && Mas.active !== "spade") {
				Mas.changeCard("spade");

			} else {
				Mas.change();
			}
		} else {
			//Add 1 to counter
			Mas.playSound("nochange");
			if(Mas.changeExponential) {
				Mas.changeCounter ++;
			}
			Nodes.chance.innerHTML = Mas.changeCounter * Mas.changePercent + "%";
			//Mas.playAgain();
		}

	},

	changeCard: function(suit) {
		Mas.active = suit;
		Nodes.actual.firstChild.src = "pics/" + suit + ".png";
		Mas.changeCounter = 1;
		Nodes.chance.innerHTML = Mas.changeCounter * Mas.changePercent + "%";
		//Mas.playAgain();
	},

	playAgain: function() {
		//Display play again button
		var reLink = document.createElement("a");
		reLink.href = "#";

		var reStart = document.createElement("img");
		reStart.src = "pics/shuffle.png";
		reStart.id = "restart";

		reLink.appendChild(reStart);
		reLink.addEventListener("click", function(e){
			e.preventDefault();
			location.reload();
		});

		Nodes.shuffle.appendChild(reLink);
	},

	playSound: function(sound){
		document.getElementById("sound").innerHTML="<embed src='"+"sound/" + sound +".mp3"+"' hidden=true autostart=true loop=false>";
	}
};

var Nodes = {
	//Initial cards
	heartCard: document.getElementById("heart"),
	cloveCard: document.getElementById("clove"),
	diamondCard: document.getElementById("diamond"),
	spadeCard: document.getElementById("spade"),

	//Selects
	interval: document.getElementById("interval"),
	probability: document.getElementById("probability"),
	exponential: document.getElementById("exponential"),

	//Divs
	choose: document.getElementById("choose"),
	timer: document.getElementById("timer"),
	chance: document.getElementById("chance"),
	sound: document.getElementById("sound"),
	shuffle: document.getElementById("shuffle"),
	actual: document.getElementById("actual")
};

window.onload = Mas.init;
