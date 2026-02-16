require('dotenv').config();

const { notifyTrap } = require('../services/notificationService');
const logger = require('../utils/logger');

(async () => {
  try {
    console.log('[TEST-EMAIL] Sending test email via Default-Automation...');

    await notifyTrap({
      platform: 'test-email',
      user: 'Rokeeb',
      message: 'This is a test email from Default-Automation on the Novyaty server.'
    });

    console.log('[TEST-EMAIL] If ENABLE_EMAIL=true and EMAIL_USER/EMAIL_PASS/NOTIFY_EMAIL are correct, you should receive an email shortly.');
    process.exit(0);
  } catch (err) {
    logger.error('[TEST-EMAIL] Failed: ' + (err && err.message));
    console.error(err);
    process.exit(1);
  }
})();