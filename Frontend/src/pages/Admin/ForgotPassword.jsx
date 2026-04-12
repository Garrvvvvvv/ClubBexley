import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAdmin } from "../../lib/apiAdmin";
import { ArrowRight, Lock, Mail, KeyRound } from "lucide-react";

export default function ForgotPassword() {
    // 1: Request OTP | 2: Verify OTP | 3: Reset Password
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [msg, setMsg] = useState("");

    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetToken, setResetToken] = useState("");

    const navigate = useNavigate();

    // Step 1: Request OTP
    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setErr("");
        setMsg("");
        setLoading(true);

        try {
            const res = await apiAdmin.post("/api/admin/auth/forgot-password", { username });
            setMsg(res.data.message);
            setStep(2);
        } catch (error) {
            setErr(error.response?.data?.message || "Failed to request OTP");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setErr("");
        setMsg("");
        setLoading(true);

        try {
            const res = await apiAdmin.post("/api/admin/auth/verify-otp", { username, otp });
            setResetToken(res.data.resetToken);
            setMsg("OTP verified successfully. Please enter your new password.");
            setStep(3);
        } catch (error) {
            setErr(error.response?.data?.message || "Invalid or expired OTP");
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setErr("");
        setMsg("");

        if (newPassword !== confirmPassword) {
            return setErr("Passwords do not match");
        }

        setLoading(true);

        try {
            const res = await apiAdmin.post("/api/admin/auth/reset-password", {
                resetToken,
                newPassword
            });
            setMsg(res.data.message);
            setTimeout(() => {
                navigate("/admin/login");
            }, 2000);
        } catch (error) {
            setErr(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#f5f5f5" }}>
            {/* Main Card */}
            <div
                className="w-full max-w-[900px] min-h-[500px] md:h-[500px] bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden relative"
                style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(0, 0, 0, 0.04)"
                }}
            >

                {/* Red accent bar at top */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #CA0002, #e53535)", zIndex: 20 }} />

                {/* Left Side: Form Content */}
                <div className="w-full md:w-1/2 p-10 sm:p-14 flex flex-col justify-center order-2 md:order-1 relative z-10">
                    <div className="w-full">
                        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">
                            Admin Reset
                        </h1>
                        <p className="text-sm text-gray-400 mb-8">
                            {step === 1 && "Enter your admin email to receive an OTP"}
                            {step === 2 && "Enter the 6-digit OTP sent to your email"}
                            {step === 3 && "Create a new admin password"}
                        </p>

                        {err && (
                            <div className="bg-red-50/50 text-[#CA0002] text-sm py-2.5 px-3 rounded-lg border border-red-100 text-center mb-5 font-medium">
                                {err}
                            </div>
                        )}

                        {msg && (
                            <div className="bg-green-50/50 text-green-700 text-sm py-2.5 px-3 rounded-lg border border-green-100 text-center mb-5 font-medium">
                                {msg}
                            </div>
                        )}

                        {/* STEP 1 FORM */}
                        {step === 1 && (
                            <form onSubmit={handleRequestOtp} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Admin Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-gray-400" />
                                        <input
                                            type="email"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-[#fafafa] border-[1.5px] border-[#e8e8e8] text-gray-800 rounded-lg py-3 pl-[42px] pr-4 focus:border-[#CA0002] focus:ring-[3px] focus:ring-[#CA0002]/10 outline-none transition-all duration-200 placeholder-gray-300"
                                            placeholder="Enter your registered role email"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#CA0002] hover:bg-[#b10002] text-white font-semibold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6 shadow-[0_4px_14px_rgba(202,0,2,0.25)] hover:shadow-[0_6px_20px_rgba(202,0,2,0.35)] hover:-translate-y-[1px]"
                                >
                                    {loading ? "Sending OTP..." : "Send OTP"}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </button>
                            </form>
                        )}

                        {/* STEP 2 FORM */}
                        {step === 2 && (
                            <form onSubmit={handleVerifyOtp} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Enter OTP</label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full bg-[#fafafa] border-[1.5px] border-[#e8e8e8] text-gray-800 rounded-lg py-3 pl-[42px] pr-4 focus:border-[#CA0002] focus:ring-[3px] focus:ring-[#CA0002]/10 outline-none transition-all duration-200 placeholder-gray-300"
                                            placeholder="6-digit code"
                                            maxLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#CA0002] hover:bg-[#b10002] text-white font-semibold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6 shadow-[0_4px_14px_rgba(202,0,2,0.25)] hover:shadow-[0_6px_20px_rgba(202,0,2,0.35)] hover:-translate-y-[1px]"
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </button>

                                <div className="text-center mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs font-semibold text-gray-400 hover:text-[#CA0002] transition-colors"
                                    >
                                        Didn't receive an email? Go back
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* STEP 3 FORM */}
                        {step === 3 && (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-gray-400" />
                                        <input
                                            type="password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-[#fafafa] border-[1.5px] border-[#e8e8e8] text-gray-800 rounded-lg py-3 pl-[42px] pr-4 focus:border-[#CA0002] focus:ring-[3px] focus:ring-[#CA0002]/10 outline-none transition-all duration-200 placeholder-gray-300"
                                            placeholder="••••••••"
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-gray-400" />
                                        <input
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-[#fafafa] border-[1.5px] border-[#e8e8e8] text-gray-800 rounded-lg py-3 pl-[42px] pr-4 focus:border-[#CA0002] focus:ring-[3px] focus:ring-[#CA0002]/10 outline-none transition-all duration-200 placeholder-gray-300"
                                            placeholder="••••••••"
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#CA0002] hover:bg-[#b10002] text-white font-semibold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6 shadow-[0_4px_14px_rgba(202,0,2,0.25)] hover:shadow-[0_6px_20px_rgba(202,0,2,0.35)] hover:-translate-y-[1px]"
                                >
                                    {loading ? "Resetting..." : "Reset Password"}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </button>
                            </form>
                        )}

                        {step === 1 && (
                            <p className="mt-8 text-center text-xs text-gray-400 tracking-wide">
                                Remember your password?{" "}
                                <Link to="/admin/login" className="text-[#CA0002] font-semibold hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Side: Image/Branding */}
                <div className="hidden md:flex w-full md:w-1/2 relative bg-gray-900 order-1 md:order-2 items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle at center, #CA0002 0%, transparent 70%)'
                        }}
                    />
                    <img
                        src="/assets/tiet-bg .webp"
                        alt="Admin Portal"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="relative z-10 text-center p-8 flex flex-col items-center justify-center">
                        <div
                            className="bg-white p-3 rounded-xl mb-6 shadow-2xl inline-flex items-center justify-center"
                            style={{ width: 64, height: 64 }}
                        >
                            <img src="/assets/ti_logo.png" alt="ARC Logo" className="w-full h-full object-contain p-1" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">ARC Admin</h2>
                        <p className="text-gray-300 text-sm max-w-[240px] text-center font-medium leading-relaxed">
                            Secure access recovery channel for Alumni Events Portal.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
