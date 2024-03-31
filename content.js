function checkForAds() {
  let adExist = document.getElementsByClassName("ad-showing").length > 0;
  let video = document.getElementsByClassName("video-stream html5-main-video")[0];

  if (adExist && video) {
    video.playbackRate = 9.5;
  }

  let skipButton = document.getElementsByClassName("ytp-ad-skip-button-modern ytp-button")[0]
  if (skipButton && !skipButton.clicked) {
    skipButton.click();
    skipButton.clicked = true;
    chrome.runtime.sendMessage({ adsSkipped: true });
  } else if (!adExist) {
    if (skipButton) skipButton.clicked = false;
  }
}

setInterval(checkForAds, 500);