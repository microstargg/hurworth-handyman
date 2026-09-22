"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

type FormStatus = "idle" | "loading" | "success" | "error";

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#"
          className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
        >
          Hurworth Handyman
        </a>
        <nav className="flex items-center gap-5 sm:gap-8">
          <a
            href="#services"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:inline"
          >
            Services
          </a>
          <a
            href="#work"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:inline"
          >
            Work
          </a>
          <a
            href="#about"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:inline"
          >
            About
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md"
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
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(165deg, #d8e8f2 0%, #eef3f0 42%, #e4ece7 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-soft/80 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-6xl grid-cols-1 items-end gap-2 px-6 pt-12 sm:items-center sm:gap-8 sm:py-16 lg:grid-cols-2 lg:items-end lg:gap-8 lg:py-10">
        <div className="relative z-10 order-1 max-w-xl pb-2 sm:pb-0 lg:self-center lg:pb-12">
          <p className="animate-fade-up font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            Hurworth Handyman
          </p>
          <h1 className="animate-fade-up animate-delay-1 mt-5 text-xl font-medium leading-snug text-ink/90 sm:text-2xl">
            Reliable repairs and renovation project management, close to home.
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Day-to-day fixes, rental upkeep, and full refurbs for landlords and
            homeowners in Hurworth and the surrounding area.
          </p>
          <div className="animate-fade-up animate-delay-3 mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md"
            >
              Send a message
            </a>
            <a
              href="#services"
              className="text-sm font-semibold text-green underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              See how I can help
            </a>
          </div>
        </div>

        <div className="animate-fade-in relative order-2 -mx-6 flex items-end justify-center sm:mx-0 lg:-mr-6 lg:justify-end xl:-mr-10">
          <div
            className="pointer-events-none absolute bottom-[8%] left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-[50%] bg-sky/55 blur-3xl"
            aria-hidden="true"
          />
          <Image
            src="/images/character/portrait-hammer.png"
            alt="Friendly cartoon handyman holding a hammer"
            width={618}
            height={968}
            priority
            className="relative z-10 h-auto max-h-[min(52vh,560px)] w-auto max-w-full object-contain object-bottom drop-shadow-xl sm:max-h-[min(60vh,640px)] lg:max-h-[min(78vh,720px)] lg:w-full"
          />
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Handyman repairs & maintenance",
    description:
      "Odd jobs, fixes, and fittings around the home — or repairs between tenancies. If something needs doing, I can help get it sorted.",
    image: "/images/character/fence-hammering.png",
    imageAlt: "Handyman cartoon fixing a wooden fence",
  },
  {
    title: "Rental property upkeep",
    description:
      "Ongoing maintenance and responsive call-outs for landlords — keeping your properties in good condition and your tenants looked after.",
    image: "/images/character/arms-crossed.png",
    imageAlt: "Handyman cartoon ready for property call-outs",
  },
  {
    title: "Renovation project management",
    description:
      "Planning a refurb? I coordinate trades, timelines, and quality from start to finish — so your renovation stays on track and gets done properly.",
    image: "/images/character/drill-wood.png",
    imageAlt: "Handyman cartoon drilling into timber",
  },
];

export function Services() {
  return (
    <section id="services" className="border-b border-line bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            How I can help
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Handyman and project management services for landlords and
            homeowners in Hurworth and the surrounding area.
          </p>
        </Reveal>

        <ul className="mt-14 space-y-16 sm:space-y-20">
          {services.map((service, index) => (
            <li key={service.title}>
              <Reveal>
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
                    <div
                      className="absolute inset-8 rounded-full bg-bg-soft/80"
                      aria-hidden="true"
                    />
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      width={618}
                      height={968}
                      className="relative h-auto w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-wood">
                      0{index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const workItems = [
  {
    src: "/images/work/fence-install.jpg",
    label: "Fence install",
  },
  {
    src: "/images/work/repairs.jpg",
    label: "Repairs",
  },
  {
    src: "/images/work/renovation.jpg",
    label: "Renovation",
  },
];

export function WorkStrip() {
  return (
    <section id="work" className="border-b border-line bg-bg px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Recent work
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            A snapshot of jobs around Hurworth — fences, repairs, and
            refurbishment work for local landlords and homeowners.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item) => (
            <Reveal key={item.src}>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-soft">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-lg font-semibold text-ink">
                    {item.label}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="border-b border-line bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-xs sm:max-w-sm">
            <div
              className="absolute inset-4 rounded-[2rem] bg-bg-soft/70"
              aria-hidden="true"
            />
            <Image
              src="/images/character/arms-crossed.png"
              alt="Handyman cartoon standing confidently with arms crossed"
              width={618}
              height={968}
              className="relative h-auto w-full object-contain"
            />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Straightforward, dependable work
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              I work with landlords and homeowners across Hurworth and the
              surrounding area — from quick repairs between tenancies to
              managing full renovation projects.
            </p>
            <p>
              If you need a reliable hand with something around the house or a
              property you let out, get in touch and I&apos;ll come back to you.
            </p>
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md"
          >
            Ask about a job
          </a>
        </Reveal>
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

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green/30 bg-green/5 p-8 text-center">
        <p className="text-lg font-medium text-green">
          Thanks — I&apos;ll be in touch.
        </p>
        <p className="mt-2 text-sm text-muted">
          Your message has been received. I&apos;ll get back to you as soon as I
          can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-wood hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Name <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">
          Phone <span className="text-muted">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          placeholder="Your phone number"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${fieldClass} resize-y`}
          placeholder="Tell me about the job..."
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Please try again in a moment.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-bg px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-[220px] lg:mx-0 lg:max-w-[260px]">
            <Image
              src="/images/character/lawn-mowing.png"
              alt="Handyman cartoon outdoors"
              width={618}
              height={968}
              className="h-auto w-full object-contain"
            />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-3 max-w-md text-lg text-muted">
            Drop me a message and I&apos;ll get back to you. No obligation —
            just tell me what you need help with.
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-wood">
            Hurworth &amp; surrounding areas
          </p>
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-display text-lg font-semibold text-ink">
          Hurworth Handyman
        </p>
        <p className="text-sm text-muted">
          &copy; {year} Hurworth Handyman. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
