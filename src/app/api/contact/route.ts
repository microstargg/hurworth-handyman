import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { name, email, phone, message } = parsed.data;
    const sql = getSql();

    await sql`
      INSERT INTO contact_enquiries (name, email, phone, message)
      VALUES (${name}, ${email}, ${phone || null}, ${message})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { error: "Unable to submit your message. Please try again later." },
      { status: 500 },
    );
  }
}
