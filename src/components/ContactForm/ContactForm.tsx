"use client";

import { useState } from "react";

type ContactFormValues = { name: string; email: string; message: string };

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormValues>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (status === "error" || status === "success") setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const fieldClassName = "mt-2 w-full border border-white/10 bg-[#050505] p-5 font-mono text-white placeholder:text-white/30 transition-all focus:border-toxic focus:outline-none";

  return (
    <section id="contact" className="scroll-mt-20 border-b border-toxic/20 bg-black py-24 text-center">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-4 text-5xl font-black uppercase tracking-tighter text-toxic drop-shadow-[0_0_15px_rgba(57,255,20,0.5)] sm:text-7xl">Contact</h1>
        <p className="mb-12 text-sm uppercase tracking-widest text-zinc-400">Bookings · Features · General enquiries</p>

        <form onSubmit={handleSubmit} aria-busy={status === "loading"} className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-widest text-zinc-300">
              Your name
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                required
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                className={fieldClassName}
              />
            </label>
            <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-widest text-zinc-300">
              Your email
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={fieldClassName}
              />
            </label>
          </div>
          <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-widest text-zinc-300">
            Message
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              maxLength={5_000}
              required
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={`${fieldClassName} resize-y`}
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full border-2 border-toxic bg-transparent py-5 text-xl font-black uppercase tracking-widest text-toxic transition-all duration-300 hover:bg-toxic hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : status === "success" ? "Message sent" : "Send message"}
          </button>
          {status === "success" && <p role="status" className="mt-2 text-center font-mono text-toxic">Thanks. Your message was sent.</p>}
          {status === "error" && <p role="alert" className="mt-2 text-center font-mono text-red-400">Message delivery is unavailable right now. Please try again later.</p>}
        </form>
      </div>
    </section>
  );
}
