import { buildFeedbackUrl } from './assets/feedback-url.js';
import { adjustInstallLink, adjustUninstallInstructions, setCurrentYear } from './assets/shared.js';

adjustInstallLink();
adjustUninstallInstructions();
setCurrentYear();

document.querySelectorAll('.support-link').forEach((link) => {
  link.href = buildFeedbackUrl();
});
