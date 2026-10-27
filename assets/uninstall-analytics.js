/**
 * Sends sanitized Google Analytics page views for extension-triggered uninstall pages.
 */

const ANALYTICS_TIMEOUT_MS = 1_200;
const EXTENSION_VERSION_PATTERN = /^\d+(?:\.\d+){0,3}$/;

export function trackUninstallPageView({ callback } = {}) {
  const extensionVersion = getExtensionVersion();
  const installationId = getInstallationId();

  globalThis.gtag('event', 'page_view', {
    ...(extensionVersion && {
      extension_version: extensionVersion,
    }),
    ...(installationId && {
      installation_id: installationId,
    }),
    ...(callback && {
      event_callback: callback,
      event_timeout: ANALYTICS_TIMEOUT_MS,
    }),
  });
}

function getExtensionVersion() {
  const version = new URL(location.href).searchParams.get('version');
  return version && EXTENSION_VERSION_PATTERN.test(version) ? version : null;
}

function getInstallationId() {
  return new URL(location.href).searchParams.get('installation_id');
}
