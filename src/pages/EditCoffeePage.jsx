import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCoffeeById, updateCoffee } from "../api/coffeeApi";
import CoffeeForm from "../components/CoffeeForm";
import LoadingState from "../components/LoadingState";
import SectionHeading from "../components/SectionHeading";

function EditCoffeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCoffee() {
      try {
        const response = await getCoffeeById(id);

        if (!cancelled) {
          setCoffee(response.result);
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load coffee.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCoffee();

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(payload) {
    setSubmitting(true);

    try {
      await updateCoffee(id, payload);
      toast.success("Coffee updated successfully.");
      navigate("/admin/coffees");
    } catch {
      toast.error("Failed to save coffee.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState label="Loading editor..." />;
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Edit catalog item"
        title={`Refine ${coffee?.name || "coffee entry"}`}
        description="Update the product narrative, pricing, or availability without leaving the admin workflow."
      />
      <CoffeeForm
        initialValues={coffee}
        submitLabel="Save changes"
        submitting={submitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditCoffeePage;
