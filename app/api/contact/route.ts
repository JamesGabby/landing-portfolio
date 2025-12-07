import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { validateContactForm, hasErrors } from "@/lib/validations/contact";
import { sendNotificationEmail } from "@/lib/email";

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Use service role key for server-side operations (bypasses RLS securely)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role for API routes
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      }
    );

    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate form data
    const errors = validateContactForm(body);
    if (hasErrors(errors)) {
      return NextResponse.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    // Honeypot check (if implemented in form)
    if (body.website) {
      // Bot detected, silently succeed
      return NextResponse.json({ success: true });
    }

    // Prepare data for Supabase
    const submissionData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company?.trim() || null,
      project_type: body.projectType || null,
      budget: body.budget || null,
      timeline: body.timeline || null,
      message: body.message.trim(),
      source: "website",
      status: "new",
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to submit form. Please try again." },
        { status: 500 }
      );
    }

    // Optional: Send email notification
    await sendNotificationEmail(submissionData);

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you within 24 hours.",
      id: data.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}