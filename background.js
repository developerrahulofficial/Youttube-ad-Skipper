chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ adsSkipped: 0 });
  chrome.action.setBadgeText({ text: '0' });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(`Script injection failed: ${chrome.runtime.lastError.message}`);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.adsSkipped !== undefined) {
    chrome.storage.local.get('adsSkipped', (data) => {
      let newCount = (data.adsSkipped || 0) + 1;
      chrome.storage.local.set({ adsSkipped: newCount }, () => {
        chrome.action.setBadgeText({ text: newCount.toString() });
        if (sender.tab.id) {
          chrome.action.setBadgeBackgroundColor({ color: '#FF0000', tabId: sender.tab.id });
        }
      });
    });
  }
});
