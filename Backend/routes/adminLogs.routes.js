import express from "express";
import AdminLog from "../models/AdminLog.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

/**
 * GET /api/admin/logs
 * Query params: 
 * - page: default 1
 * - limit: default 20
 * - action: filter by action type (optional)
 * - from: ISO date start (optional)
 * - to: ISO date end (optional)
 */
router.get("/", requireAdmin, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { action, from, to } = req.query;

        const query = {};

        // Action filter
        if (action) {
            query.action = action;
        }

        // Date range filter
        if (from || to) {
            query.createdAt = {};
            if (from) query.createdAt.$gte = new Date(from);
            if (to) query.createdAt.$lte = new Date(to);
        }

        const total = await AdminLog.countDocuments(query);
        const logs = await AdminLog.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("adminId", "username"); // Optional – we already de-normalised adminName but good to have link

        res.json({
            logs,
            total,
            page,
            pages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Fetch Admin Logs Error:", error);
        res.status(500).json({ message: "Failed to fetch logs" });
    }
});

/**
 * GET /api/admin/logs/actions
 * Returns a list of all unique action types currently in the log for filtering.
 */
router.get("/actions", requireAdmin, async (req, res) => {
    try {
        const actions = await AdminLog.distinct("action");
        res.json(actions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch action types" });
    }
});

export default router;
