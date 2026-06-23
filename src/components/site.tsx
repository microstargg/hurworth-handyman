"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-semibold tracking-tight text-white">
          Hurworth Handyman
        </a>
        <nav>
          <a
            href="#contact"
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/60 px-6 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(217,119,6,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(148,163,184,0.1) 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-amber-500">
          Hurworth &amp; surrounding areas
        </p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Reliable handyman work and renovation project management
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
          From day-to-day repairs on rental properties to full refurbishment
          projects — practical, dependable work you can count on.
        </p>
        <a
          href="#contact"
          className="mt-10 inline-flex items-center rounded-lg bg-amber-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-amber-500"
        >
          Send a message
        </a>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Handyman repairs & maintenance",
    description:
      "General jobs for rental properties and occasional work for other clients — fixes, fittings, and the small jobs that keep a property running smoothly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437Zm6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: "Rental property upkeep",
    description:
      "Ongoing maintenance for properties I and my family rent out — keeping tenants happy and properties in good condition.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Renovation project management",
    description:
      "Coordinating rental property refurbishments from start to finish — trades, timelines, and quality, so the job gets done properly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="border-b border-slate-800/60 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">What I do</h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Practical help for landlords and homeowners — no fuss, no overselling.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <div className="mb-4 inline-flex rounded-lg bg-amber-600/10 p-3 text-amber-500">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="border-b border-slate-800/60 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Straightforward, dependable work
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-slate-300 leading-relaxed">
          <p>
            Most of my work comes through word of mouth — landlords and
            homeowners who need someone reliable to look after their properties.
          </p>
          <p>
            I know rental properties inside out, from quick repairs between tenancies
            to managing full renovation projects. If you need a hand with something
            around the house or a property you let out, get in touch and I&apos;ll
            come back to you.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-8 text-center">
        <p className="text-lg font-medium text-emerald-400">Thanks — I&apos;ll be in touch.</p>
        <p className="mt-2 text-sm text-slate-400">
          Your message has been received. I&apos;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-amber-500 hover:text-amber-400"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
          Name <span className="text-amber-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-400" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
          Email <span className="text-amber-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
          Phone <span className="text-slate-500">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="Your phone number"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1.5 text-sm text-red-400" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300">
          Message <span className="text-amber-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="Tell me about the job..."
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong. Please try again in a moment.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-amber-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-white">Get in touch</h2>
          <p className="mt-3 text-slate-400">
            Drop me a message and I&apos;ll get back to you. No obligation — just
            tell me what you need help with.
          </p>
        </div>
        <div className="mt-10 max-w-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800/60 px-6 py-8">
      <div className="mx-auto max-w-5xl text-center text-sm text-slate-500">
        <p>&copy; {year} Hurworth Handyman. All rights reserved.</p>
      </div>
    </footer>
  );
}
