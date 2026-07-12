// utils/notify.js
// Placeholder for Phase 4 (Notifications).
// Will create Notification documents (see models/Notification.js) when events occur
// (e.g. approval/rejection, badge unlocked, reward redeemed).

async function createNotification(Notification, { user, type, message }) {
  return Notification.create({ user, type, message, isRead: false });
}

module.exports = { createNotification };
