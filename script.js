const buttonsWrapper = document.querySelector(
  ".val_proposition_buttons_wrapper"
);
const checkbox = document.querySelector("#val_proposition_answer");
const repeatBtns = document.querySelectorAll("#repeat_button");

const noBtn = buttonsWrapper.children[2];

let timesToIncrease = 2;

buttonsWrapper.addEventListener("click", function (event) {
  if (event.target.nodeName !== "BUTTON") return;
  const buttonSuccessAnswer = event.target.value === "true";
  checkbox.checked = buttonSuccessAnswer;

  if (buttonSuccessAnswer) {
    playVideo(buttonSuccessAnswer);
  }

  if (!buttonSuccessAnswer) {
    timesToIncrease = calculateStep(timesToIncrease);
    increaseNoBtnSize(timesToIncrease);
    checkIsNoOnFullScreen();
  }
});

repeatBtns.forEach((button) => {
  button.addEventListener("click", repeatSurvey);
});

function increaseNoBtnSize(timesToIncrease) {
  let sureText = "";
  for (let i = 0; i < timesToIncrease / 1.5; i++) {
    sureText += "sure" + " ";
  }

  noBtn.style.width = timesToIncrease * 200 + "px";
  noBtn.style.height = timesToIncrease * 100 + "px";
  noBtn.textContent = "Are you " + sureText + " ?";
}

function calculateStep(timesToIncrease) {
  return (timesToIncrease = timesToIncrease * 1.5);
}

function checkIsNoOnFullScreen() {
  const isOnFullScreen =
    noBtn.offsetWidth >= window.innerWidth &&
    noBtn.offsetHeight >= window.innerHeight;

  if (isOnFullScreen) {
    playVideo();
    return true;
  }

  return false;
}

function playVideo(answer) {
  const video_section = document.getElementById("video_section");
  const happy_wrapper = document.getElementById("video_wrapper_happy");
  const happy_video = document.getElementById("happy_videoId");
  const sad_wrapper = document.getElementById("video_wrapper_sad");
  const sad_video = document.getElementById("sad_videoId");

  video_section.style.display = "grid";
  if (answer) {
    happy_wrapper.style.display = "block";
    sad_wrapper.style.display = "none";
    happy_video.play();
    happy_video.muted = false;
  } else {
    happy_wrapper.style.display = "none";
    sad_wrapper.style.display = "block";
    sad_video.play();
    sad_video.muted = false;
  }

  setNoButtonToDefault();
}

function repeatSurvey() {
  const video_section = document.getElementById("video_section");
  video_section.style.display = "none";

  for (let i = 0; i < video_section.children.length; i++) {
    video_section.children[i].children[0].pause();
    video_section.children[i].children[0].currentTime = 0;
  }

  setNoButtonToDefault();
}

function setNoButtonToDefault() {
  noBtn.style.width = "120px";
  noBtn.style.height = "52px";
  noBtn.textContent = "NO";

  timesToIncrease = 2;
}
