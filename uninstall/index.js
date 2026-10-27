/**
 * Initializes the incomplete-uninstall recovery instructions and page-view analytics.
 */
import { adjustInstallLink, adjustUninstallInstructions, detectBrowser } from '../assets/shared.js';
import { trackUninstallPageView } from '../assets/uninstall-analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  adjustInstallLink();
  adjustUninstallInstructions();
  setupInstructionScreenshots();
  trackUninstallPageView();
});

function setupInstructionScreenshots() {
  const browser = detectBrowser();
  const browserName = browser === 'Edge' ? 'Microsoft Edge' : 'Google Chrome';
  const browserPrefix = browser.toLowerCase();

  setupInstructionScreenshot(
    '#install-screenshot',
    `./img/${browserPrefix}-install.png`,
    `${browserName} extension store showing the button to install the extension`
  );
  setupInstructionScreenshot(
    '#options-screenshot',
    `./img/${browserPrefix}-options.png`,
    `${browserName} showing how to open the extension options page`
  );
  setupInstructionScreenshot(
    '#uninstall-screenshot',
    './img/uninstall-button.png',
    'Extension options page showing the Uninstall extension button'
  );
}

function setupInstructionScreenshot(selector, src, alt) {
  const screenshot = document.querySelector(selector);
  const frame = screenshot.closest('.instruction-screenshot-frame');
  const placeholder = frame.querySelector('.instruction-screenshot-placeholder');

  screenshot.addEventListener('load', () => frame.classList.remove('is-placeholder'));
  screenshot.addEventListener('error', () => frame.classList.add('is-placeholder'));
  placeholder.textContent = `Screenshot placeholder: ${src.replace('./img/', '')}`;
  screenshot.src = src;
  screenshot.alt = alt;
}
