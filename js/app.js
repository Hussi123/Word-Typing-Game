
const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpnTag = document.querySelector(".wpn span"),
  crmTag = document.querySelector(".cpm span"),
  tryAgain = document.querySelector(".content button");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = mistakes = isTyping = 0;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraph.length)
  typingText.innerHTML = "";

  paragraph[randIndex].split("").forEach(span => {
    let spanTag = `<span class="spn">${span}<span/>`;
    typingText.innerHTML += spanTag;
  })

  typingText.querySelectorAll(".spn")[0].classList.add("active");

  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll(".spn");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }


    if (typedChar == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add('correct');
      } else {
        mistakes++;
        characters[charIndex].classList.add('incorrect');
      }
      charIndex++;
    }
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpn = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    wpn = wpn < 0 || !wpn || wpn === Infinity ? 0 : wpn;
    wpnTag.innerText = wpn
    mistakeTag.innerText = mistakes;
    crmTag.innerText = charIndex - mistakes;
  } else {
    inpField.value = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  randomParagraph()
  inpField.value = "";
  clearInterval(timer);
  timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpnTag.innerText = 0;
  crmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener('input', initTyping);
tryAgain.addEventListener('click', resetGame);

