import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscriptions")
      .select("id, status")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        await supabase
          .from("newsletter_subscriptions")
          .update({ status: "active" })
          .eq("id", existing.id);

        return NextResponse.json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
        });
      }
    }

    // Insert new subscription
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .insert([{ email: email.toLowerCase(), status: "active" }]);

    if (error) {
      console.error("Newsletter subscription error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing! You'll receive updates soon.",
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}