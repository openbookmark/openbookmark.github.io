/* global gtag */

import { buildFeedbackUrl } from '../assets/feedback-url.js';
import { adjustInstallLink, detectBrowser, getRedirectUrl } from '../assets/shared.js';

document.addEventListener('DOMContentLoaded', () => {
  adjustInstallLink();
  document.querySelector('#feedback-link').href = buildFeedbackUrl();
  renderPage();
});

function renderPage() {
  const browser = detectBrowser();

  document.title = 'Extension is disabled or removed';
  document.querySelector('#page-title').textContent = 'Extension is disabled or removed';

  setupRecoveryActions(browser);
  setupTargetAction();
}

function setupRecoveryActions(browser) {
  const reinstallLink = document.querySelector('#reinstall-extension');
  reinstallLink.hidden = false;
  reinstallLink.addEventListener('click', () => gtag('event', 'reinstall_extension_click'));

  const browserName = browser === 'Edge' ? 'Microsoft Edge' : 'Google Chrome';
  const imagePrefix = browser.toLowerCase();
  setupInstructionScreenshot(
    '#enable-screenshot',
    `./img/${imagePrefix}-turn-on.png`,
    `${browserName} extension store showing the button to enable the extension`
  );
  setupInstructionScreenshot(
    '#reinstall-screenshot',
    `./img/${imagePrefix}-install.png`,
    `${browserName} extension store showing the button to install the extension`
  );
}

function setupInstructionScreenshot(selector, src, alt) {
  const screenshot = document.querySelector(selector);
  screenshot.src = src;
  screenshot.alt = alt;
}

function setupTargetAction() {
  const redirectUrl = getRedirectUrl();
  if (!redirectUrl) return;

  let targetUrl;
  try {
    targetUrl = new URL(redirectUrl);
  } catch {
    return;
  }

  if (!['http:', 'https:'].includes(targetUrl.protocol)) return;

  const targetLink = document.querySelector('#target-link');
  targetLink.hidden = false;
  targetLink.href = targetUrl.href;
  targetLink.setAttribute('aria-label', `Navigate to ${targetUrl.hostname}`);
  const caption = document.createElement('span');
  caption.textContent = 'Navigate to';
  const hostname = document.createElement('code');
  hostname.textContent = targetUrl.hostname;
  const content = document.createElement('span');
  content.className = 'option-action-content';
  content.append(caption, hostname);
  targetLink.replaceChildren(content);
  targetLink.addEventListener('click', () => gtag('event', 'target_url_click'));
  document.querySelector('#target-option').hidden = false;
}
