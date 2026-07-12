const Notification = require('../models/Notification');

// GET /api/notifications — returns the logged-in user's notifications.
exports.getAll = async (req, res) => {
  try {
    const filter = { user: req.user.id };
    if (req.query.isRead !== undefined) filter.isRead = req.query.isRead === 'true';

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PATCH /api/notifications/:id/read
exports.markRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.id, user: req.user.id });
    if (!notification)
      return res.status(404).json({ success: false, error: 'Notification not found' });

    notification.isRead = true;
    await notification.save();

    res.json({ success: true, data: notification });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
