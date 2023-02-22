let board = document.querySelector('.board');
let activeLetters = document.querySelector('.activeLetters');
let gameMenu = document.querySelector('.game-menu')
let allLetters = document.querySelector('.allLetters');
let stepPoint = document.querySelector('.stepPoint');
let coinPoint = document.querySelector('.coinPoint');
let timePoint = document.querySelector('.timePoint');
let pictures = ['img/melon.avif', 'img/dog.avif', 'img/eagle.avif', 'img/elephan.avif', 'img/flag.avif', 'img/home.avif', 'img/lion.avif', 'img/monkey.avif', 'img/panda.avif', 'img/phone.avif', 'img/pingvin.avif', 'img/shark.avif', 'img/snake.avif', 'img/tv.avif', 'img/pancle.avif', 'img/pizza.avif', 'img/student.avif', 'img/chicken.avif', 'img/zombie.avif', 'img/tomato.avif', 'img/crocodile.avif', 'ioctopus.avif', 'img/heart.avif', 'img/german flag.avif', 'img/fish.avif', 'img/duck.avif', 'img/avocado.avif'];
let names = ['WATERMELON', 'DOG', 'EAGLE', 'ELEPHANT', 'FLAG', 'HOME', 'LION', 'MONKEY', 'PANDA', 'PHONE', 'PENGUIN', 'SHARK', 'SNAKE', 'TV', 'PENCIL', 'PIZZA', 'STUDENT', 'OCTOPUS', 'HEART', 'GERMAN', 'FISH', 'DUCK', 'AVOCADO'];
let picIndex = 0;
let nameIndex = 0;
let step = 5;
let coin = 6;
let time = 30;
let letterAll, innerBoardAll, checkAll;
stepPoint.innerHTML = `Step ${step}`
coinPoint.innerHTML = `Coin ${coin}`
timePoint.innerHTML = `Time ${time}`
let result = [];
play.onclick = () => gameMenu.style.display = 'none'

function newGame() {
	board.style.background = `url(${pictures[picIndex]})`;
	for (let i = 0; i < names[nameIndex].length; i++) {
		let letter = document.createElement('div');
		letter.className = 'letter';
		activeLetters.appendChild(letter);
		letter.setAttribute('style', `--i:${i}`);
		letterAll = document.querySelectorAll('.letter');
	}
	innerBoardAll.forEach(item => item.style.pointerEvents = 'unset')
}

function $() {
	return false;
}

for (let i = 0; i < 30; i++) {
	let innerBoard = document.createElement('div');
	innerBoard.className = 'innerBoard';
	board.appendChild(innerBoard);
	innerBoardAll = document.querySelectorAll('.innerBoard');
	innerBoard.onclick = () => {
		innerBoard.style.pointerEvents = 'none'
		step--
		stepPoint.innerHTML = `Step ${step}`
		if (step < 0) {
			$();
			stepPoint.innerHTML = `Step 0`;
		} else {
			innerBoard.style.opacity = 0
		}
	}
}


let x = 0;
for (let i = 65; i <= 90; i++) {
	let check = document.createElement('div');
	check.className = 'check';
	allLetters.appendChild(check);
	check.innerText = String.fromCharCode(i);
	checkAll = document.querySelectorAll('.check');
	check.onclick = () => {
		result.push(check.innerText);
		letterAll[x].innerText = check.innerText;
		x++;
		if (x == names[nameIndex].length && result.join('') === names[nameIndex]) {
			for (let i = 0; i < innerBoardAll.length; i++) {
				innerBoardAll[i].style.opacity = 0;
				innerBoardAll[i].style.pointerEvents = 'none';
			}
			setTimeout(() => {
				letterAll.forEach(item => item.style.opacity = 0);
			}, 1000)
			setTimeout(() => {
				innerBoardAll.forEach(item => item.style.opacity = 1);
				activeLetters.innerHTML = '';
				picIndex++;
				nameIndex++;
				result = [];
				x = 0;
				step = 5;
				stepPoint.innerHTML = `Step ${step}`
				coin += 2;
				coinPoint.innerHTML = `Coin ${coin}`
			}, 2000);
			setTimeout(() => {
				newGame();
				letterAll.forEach(item => item.style.opacity = 1);
			}, 3500);
		} 
		
		else if (x == names[nameIndex].length && result.join('') !== names[nameIndex]) {
			x = 0;
			result = [];
			coin -= 2;
			coinPoint.innerText = `Coin ${coin}`;
			for (let i = 0; i < checkAll.length; i++) {
				checkAll[i].style.pointerEvents = 'none';
				setTimeout(() => {
					checkAll[i].style.pointerEvents = 'unset'
				}, 1000)
			}
			for (let i = 0; i < letterAll.length; i++) {
				letterAll[i].classList.add('shake');
				next.disabled = true;
				setTimeout(() => {
					letterAll[i].innerText = '';
					letterAll[i].classList.remove('shake');
					next.disabled = false;
				}, 1000)
			}
		}
	}
}





next.onclick = () => {
	next.disabled = true;
	for (let i = 0; i < names[nameIndex].length; i++) {
		letterAll[i].innerText = names[nameIndex][i];
	}
	innerBoardAll.forEach(item => item.style.opacity = 0);
	setTimeout(() => {
		letterAll.forEach(item => item.style.opacity = 0);
	}, 1000)
	setTimeout(() => {
		innerBoardAll.forEach(item => item.style.opacity = 1);
		activeLetters.innerHTML = '';
		picIndex++;
		nameIndex++;
		result = [];
		x = 0;
		step = 5;
		stepPoint.innerHTML = `Step ${step}`
		coin += 2;
		coinPoint.innerHTML = `Coin ${coin}`
	}, 2000);
	setTimeout(() => {
		newGame();
		letterAll.forEach(item => item.style.opacity = 1);
		next.disabled = false;
	}, 3500)
}

newGame()
