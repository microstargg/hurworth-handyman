import { Resend } from "resend";
import type { ContactFormData } from "@/lib/validations/contact";

const DEFAULT_TO = "ben@hurworthhandyman.com";

export async function sendEnquiryNotification(enquiry: ContactFormData) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  if (!apiKey || !from) {
    console.warn("Enquiry email skipped: RESEND_API_KEY or CONTACT_EMAIL_FROM not configured");
    return;
  }

  const { name, email, phone, message } = enquiry;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: process.env.CONTACT_EMAIL_TO || DEFAULT_TO,
    replyTo: email,
    subject: `New enquiry from ${name.replace(/\s+/g, " ")}`,
    text: [
      "New enquiry from the Hurworth Handyman website.",
      "",
      `Name:  ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not given"}`,
      "",
      "Message:",
      message,
      "",
      "Reply to this email to respond directly to the customer.",
    ].join("\n"),
  });

  if (error) {
    console.error("Enquiry email failed:", error);
  }
}
