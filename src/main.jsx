import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import App from "./App";
import "./index.css";

injectStyle();

document.documentElement.className = "scroll-smooth";
document.body.className =
  "m-0 min-w-[320px] bg-[#f5f1ec] font-['Kanit',ui-sans-serif,system-ui,sans-serif] text-stone-900 antialiased";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        bodyClassName="m-0 flex flex-1 items-start text-sm leading-6"
        className="fixed right-4 top-4 z-[9999] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6 sm:w-full"
        closeButton={false}
        hideProgressBar
        newestOnTop
        toastClassName="relative flex min-h-16 overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-4 text-stone-900 shadow-[0_25px_80px_rgba(28,25,23,0.14)] backdrop-blur-xl"
      />
    </BrowserRouter>
  </React.StrictMode>
);
