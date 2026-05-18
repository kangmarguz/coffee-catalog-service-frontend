import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCoffee } from "../api/coffeeApi";
import CoffeeForm from "../components/CoffeeForm";
import SectionHeading from "../components/SectionHeading";

function NewCoffeePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(payload) {
    setSubmitting(true);

    try {
      await createCoffee(payload);
      toast.success("Coffee created successfully.");
      navigate("/admin/coffees");
    } catch {
      toast.error("Failed to save coffee.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="New catalog item"
        title="Add a new coffee"
        description="Create a polished storefront entry with pricing, imagery, roast profile, and tasting notes."
      />
      <CoffeeForm
        submitLabel="Create coffee"
        submitting={submitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default NewCoffeePage;
