import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";
import Surface from "../components/ui/Surface";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, loginAdmin } = useAuth();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const from = location.state?.from?.pathname || "/admin/coffees";

  if (isAdmin) {
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
      loginAdmin(response.result);
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

      <Surface
        as="form"
        className="rounded-4xl p-6 sm:p-8"
        onSubmit={handleSubmit}
      >
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          autoComplete="email"
          autoFocus
          required
        />

        <FormField
          wrapperClassName="mt-5"
          label="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          autoComplete="current-password"
          minLength={6}
          required
        />

        <div className="mt-8 flex justify-end">
          <Button
            className="min-w-36"
            disabled={submitting}
            type="submit"
          >
            <LockKeyhole size={16} />
            {submitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </Surface>
    </div>
  );
}

export default LoginPage;
