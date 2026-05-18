import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api/authApi";
import { startAdminSession, isAdminSessionActive } from "../auth/session";
import SectionHeading from "../components/SectionHeading";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const from = location.state?.from?.pathname || "/admin/coffees";

  if (isAdminSessionActive()) {
    return <Navigate replace to="/admin/coffees" />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await login(formState);
      startAdminSession(response.result);
      toast.success("Login successful.");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <SectionHeading
        eyebrow="Admin access"
        title="Login"
        description="Guest visitors can browse the catalog. Sign in here to manage coffee products."
      />

      <form
        className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_25px_80px_rgba(28,25,23,0.08)] backdrop-blur-xl sm:p-8"
        onSubmit={handleSubmit}
      >
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Email</span>
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
            required
          />
        </label>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-medium text-stone-700">Password</span>
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            autoComplete="current-password"
            minLength={6}
            required
          />
        </label>

        <div className="mt-8 flex justify-end">
          <button
            className="inline-flex min-w-36 items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
            disabled={submitting}
            type="submit"
          >
            <LockKeyhole size={16} />
            {submitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
