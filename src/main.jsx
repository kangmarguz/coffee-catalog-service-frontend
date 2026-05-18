import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

document.documentElement.className = "scroll-smooth";
document.body.className = "m-0 min-w-[320px] bg-[#f5f1ec] text-stone-900 antialiased";

const toastStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-950 shadow-emerald-900/10",
  error: "border-rose-200 bg-rose-50 text-rose-950 shadow-rose-900/10",
  warning: "border-amber-200 bg-amber-50 text-amber-950 shadow-amber-900/10",
  info: "border-sky-200 bg-sky-50 text-sky-950 shadow-sky-900/10",
  default: "border-stone-200 bg-white text-stone-900 shadow-stone-900/10",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        theme="light"
        icon={false}
        closeButton={false}
        className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm p-0 sm:right-6 sm:top-6"
        toastClassName={({ type }) =>
          [
            "mb-3 flex min-h-0 items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-[0_20px_60px_var(--tw-shadow-color)]",
            toastStyles[type] || toastStyles.default,
          ].join(" ")
        }
        bodyClassName={() => "m-0 p-0"}
      />
    </BrowserRouter>
  </React.StrictMode>
);
