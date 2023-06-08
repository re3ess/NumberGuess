// 랜덤번호 지정
// 유저가 번호를 입력 후 'go' 라는 버튼을 누른다
// 유저가 랜덤번호를 맞췄을 경우 '정답!'
// 랜덤번호가 유저번호보다 작다면 'down'
// 랜덤번호가 유저번호보다 크다면 'up'
// Reset 버튼을 누르면 게임이 초기화
// 5번의 기회를 다 쓰면 게임이 끝난다 (버튼 없어짐)
// 1~100 범위 밖의 숫자를 입력하면 안된다고 알려준다 (기회를 깎지 않음)
// 이미 입력한 수를 또 입력하면 알려준다 (기회를 깎지 않음)

let computerNum = 0;
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let chanceArea = document.getElementById('chance-area');
let resetButton = document.getElementById('reset-button');
let chances = 5;
let gameOver = false;
let history = [];

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', () => {
  userInput.value = '';
});

function randomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log('정답', computerNum);
  gameOver = false;
  playButton.disabled = false;
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = '1 ~ 100 사이의 숫자를 입력해주세요';
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = '이미 입력한 숫자입니다';
    return;
  }

  chances--;
  chanceArea.textContent = `남은 기회: ${chances}번`;

  if (userValue < computerNum) {
    resultArea.textContent = 'Up';
  } else if (userValue > computerNum) {
    resultArea.textContent = 'Down';
  } else {
    resultArea.textContent = '정답!';
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver === true) {
    playButton.disabled = true;
  }
}

function reset() {
  // user input 창이 깨끗하게 정리되고
  userInput.value = '';
  // 새로운 번호가 생성이 되고
  randomNum();
}
randomNum();
