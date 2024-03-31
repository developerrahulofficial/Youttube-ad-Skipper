document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('adsSkipped', (data) => {
      document.getElementById('adsSkippedCount').textContent = data.adsSkipped || '0';
    });
  });
  