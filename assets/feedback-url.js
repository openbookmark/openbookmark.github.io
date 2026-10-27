/**
 * Builds website feedback-form URLs prefilled with browser and platform context.
 */

// General support form used by the homepage, privacy page, and missing-extension page.
// Keep it and its browser-info field in sync with the feedback form linked from extension options.
const FEEDBACK_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdNvoNDN7xjUYiIe1XgbWqnXdgrMloNZvori1n5VPachJtw2A/viewform?usp=pp_url&entry.624783247={browser}';

// Dedicated post-uninstall survey opened after a successful extension uninstall.
const UNINSTALL_FEEDBACK_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdHr8NrJ7v1lEvf1RmhBduiwom9VKLe9eM0S_3NDrZBnqAPFA/viewform?usp=pp_url&entry.624783247={browser}';

export function buildFeedbackUrl() {
  return buildBrowserPrefilledUrl(FEEDBACK_FORM_URL);
}

export function buildUninstallFeedbackUrl() {
  return buildBrowserPrefilledUrl(UNINSTALL_FEEDBACK_FORM_URL);
}

function buildBrowserPrefilledUrl(formUrl) {
  const { browser, platform } = getBrowserInfo();
  const browserString = `${browser} (${platform})`;
  // Both forms use this placeholder for webpage-collected browser and platform information.
  return formUrl.replace('{browser}', encodeURIComponent(browserString));
}

function getBrowserInfo() {
  const { brands = [], platform = navigator.platform } = navigator.userAgentData || {};

  // Filter out 'Not A Brand' entries
  const browser =
    brands
      .filter((b) => !/Brand/i.test(b.brand))
      .map((b) => `${b.brand} ${b.version}`)
      .join(' / ') || navigator.userAgent;

  return { browser, platform };
}
