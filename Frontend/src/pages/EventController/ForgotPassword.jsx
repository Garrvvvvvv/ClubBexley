import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiController } from "../../lib/apiController";
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
            const res = await apiController.post("/api/controller/auth/forgot-password", { username });
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
            const res = await apiController.post("/api/controller/auth/verify-otp", { username, otp });
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
            const res = await apiController.post("/api/controller/auth/reset-password", {
                resetToken,
                newPassword
            });
            setMsg(res.data.message);
            setTimeout(() => {
                navigate("/controller/login");
            }, 2000);
        } catch (error) {
            setErr(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4">
            {/* Main Card */}
            <div className="w-full max-w-[900px] min-h-[500px] md:h-[500px] bg-white rounded-[24px] shadow-2xl flex flex-col md:flex-row overflow-hidden">

                {/* Left Side: Form Content */}
                <div className="w-full md:w-1/2 p-10 sm:p-14 flex flex-col justify-center order-2 md:order-1 relative">
                    <div className="w-full">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Forgot Password
                        </h1>
                        <p className="text-sm text-gray-500 mb-8">
                            {step === 1 && "Enter your email to receive an OTP"}
                            {step === 2 && "Enter the 6-digit OTP sent to your email"}
                            {step === 3 && "Create a new password"}
                        </p>

                        {err && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center mb-5">
                                {err}
                            </div>
                        )}

                        {msg && (
                            <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 text-center mb-5">
                                {msg}
                            </div>
                        )}

                        {/* STEP 1 FORM */}
                        {step === 1 && (
                            <form onSubmit={handleRequestOtp} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-gray-400"
                                            placeholder="Enter your registered email"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#ca0002] hover:bg-[#8B0000] text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
                                >
                                    {loading ? "Sending OTP..." : "Send OTP"}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </button>
                            </form>
                        )}

                        {/* STEP 2 FORM */}
                        {step === 2 && (
                            <form onSubmit={handleVerifyOtp} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-gray-400"
                                            placeholder="6-digit code"
                                            maxLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#ca0002] hover:bg-[#8B0000] text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </button>

                                <div className="text-center mt-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs text-gray-500 hover:text-[#ca0002] transition"
                                    >
                                        Didn't receive an email? Go back
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* STEP 3 FORM */}
                        {step === 3 && (
                            <form onSubmit={handleResetPassword} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-gray-400"
                                            placeholder="••••••••"
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-gray-400"
                                            placeholder="••••••••"
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#ca0002] hover:bg-[#8B0000] text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
                                >
                                    {loading ? "Resetting..." : "Reset Password"}
                                    {!loading && <ArrowRight className="h-4 w-4" />}
                                </button>
                            </form>
                        )}

                        {step === 1 && (
                            <div className="mt-8 text-center text-xs text-gray-500">
                                Remember your password?{" "}
                                <Link to="/controller/login" className="text-[#ca0002] font-semibold hover:underline">
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="w-full md:w-1/2 h-48 md:h-auto relative bg-gray-100 order-1 md:order-2">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
                        alt="Campus"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.9]"
                    />
                    <div className="absolute inset-0 bg-indigo-900/10 mix-blend-multiply" />
                </div>

            </div>
        </div>
    );
}
