import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const required = ["organizationName", "contactName", "email", "message"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }

  // TODO: Send email via Resend/SendGrid when service is configured
  // TODO: Store lead in Supabase leads table when connected
  console.log("Contact form submission:", body);

  return NextResponse.json({ success: true });
}
