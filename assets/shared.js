const isEdge = detectBrowser() === 'Edge';

export function adjustInstallLink() {
  const installUrl = getInstallUrl();
  document.querySelectorAll('.install-link').forEach((el) => (el.href = installUrl));
}

export function adjustUninstallInstructions() {
  const instructionsUrl = getUninstallInstructionsUrl();
  const videoUrl = buildYoutubeEmbedUrl(instructionsUrl);
  document
    .querySelectorAll('.uninstall-instructions-link')
    .forEach((el) => (el.href = instructionsUrl));
  document.querySelectorAll('.uninstall-instructions-video').forEach((el) => (el.src = videoUrl));
}

export function setCurrentYear(id = 'year') {
  const el = document.getElementById(id);
  if (el) el.textContent = new Date().getFullYear();
}

function getInstallUrl() {
  return isEdge
    ? 'https://microsoftedge.microsoft.com/addons/detail/bafanlmplgllnpdbemmppkbggiooifep'
    : 'https://chromewebstore.google.com/detail/mcecogccjlcplcccpnejnldpijppkfil';
}

function getUninstallInstructionsUrl() {
  return isEdge
    ? 'https://www.youtube.com/watch?v=GZ47CJFNy2I&t=114s'
    : 'https://www.youtube.com/watch?v=Ejy5kE-3lAE&t=116s';
}

function buildYoutubeEmbedUrl(watchUrl) {
  const url = new URL(watchUrl);
  const videoId = url.searchParams.get('v');
  const start = url.searchParams.get('t')?.replace(/s$/, '');
  return `https://www.youtube.com/embed/${videoId}?start=${start}`;
}

export function getRedirectUrl() {
  return new URL(location.href).searchParams.get('url');
}

export function detectBrowser() {
  if (navigator.userAgentData) {
    const brands = navigator.userAgentData.brands.map((b) => b.brand);
    if (brands.includes('Microsoft Edge')) return 'Edge';
  } else {
    const ua = navigator.userAgent;
    if (ua.includes('Edg/')) return 'Edge';
  }
  return 'Chrome';
}
