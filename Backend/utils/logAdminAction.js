import AdminLog from "../models/AdminLog.js";
import Admin from "../models/Admin.js";

/**
 * Logs an admin action to the database (fire-and-forget).
 *
 * @param {object} options
 * @param {string} options.adminId   - Admin's MongoDB ObjectId (string or ObjectId)
 * @param {string} options.adminName - Admin's username/email for display
 * @param {string} options.action    - Action label (e.g. "LOGIN", "APPROVE_REGISTRATION")
 * @param {object} [options.details] - Optional extra metadata about the action
 * @param {string} [options.ip]      - Optional IP address of the request
 */
export async function logAdminAction({ adminId, adminName, action, details = {}, ip = null }) {
    try {
        await AdminLog.create({ adminId, adminName, action, details, ip });
    } catch (err) {
        // Logging should never break the main request — just warn
        console.warn(`[AdminLog] Failed to write log (action=${action}):`, err.message);
    }
}

/**
 * Convenience wrapper that reads admin info directly from req.admin
 * (populated by requireAdmin middleware).
 *
 * @param {import('express').Request} req
 * @param {string} action
 * @param {object} [details]
 */
export async function logFromReq(req, action, details = {}) {
    let adminName = req.admin?.username || req.admin?.email;
    const adminId = req.admin?.id || req.admin?._id;

    // Fallback for existing sessions that don't have username in JWT yet
    if (!adminName && adminId) {
        try {
            const admin = await Admin.findById(adminId).select("username");
            if (admin) adminName = admin.username;
        } catch (e) {
            console.warn("[AdminLog] Could not fetch admin name fallback:", e.message);
        }
    }

    await logAdminAction({
        adminId,
        adminName: adminName || "unknown",
        action,
        details,
        ip: req.ip,
    });
}
