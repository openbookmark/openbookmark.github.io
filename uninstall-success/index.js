/**
 * Tracks successful uninstalls and redirects to the browser-prefilled feedback form.
 */
import { buildUninstallFeedbackUrl } from '../assets/feedback-url.js';
import { trackUninstallPageView } from '../assets/uninstall-analytics.js';

const REDIRECT_FALLBACK_MS = 1_500;
const feedbackUrl = buildUninstallFeedbackUrl();
let redirected = false;

setTimeout(redirectToFeedback, REDIRECT_FALLBACK_MS);
trackUninstallPageView({ callback: redirectToFeedback });

function redirectToFeedback() {
  if (redirected) return;
  redirected = true;
  location.replace(feedbackUrl);
}
