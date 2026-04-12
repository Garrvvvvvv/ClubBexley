import mongoose from "mongoose";

const AdminLogSchema = new mongoose.Schema(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        adminName: {
            type: String,
            default: "unknown",
        },
        action: {
            type: String,
            required: true,
            // e.g. LOGIN, LOGOUT, APPROVE_REGISTRATION, REJECT_REGISTRATION, etc.
        },
        details: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        ip: {
            type: String,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        // Disable automatic timestamps since we manage createdAt ourselves for TTL
        timestamps: false,
    }
);

// TTL index: auto-delete documents after 15 days (15 * 24 * 60 * 60 = 1296000 seconds)
AdminLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1296000 });

// Index for efficient querying by admin and action
AdminLogSchema.index({ adminId: 1, createdAt: -1 });
AdminLogSchema.index({ action: 1, createdAt: -1 });

export default mongoose.models.AdminLog ||
    mongoose.model("AdminLog", AdminLogSchema);
