import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { demoFormSchema } from '@/lib/validation/demo-form-schema';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate form data
    const body = await request.json();
    const validatedData = demoFormSchema.parse(body);
    const submissionId = uuidv4();
    const now = new Date().toISOString();

    const ip =
      request.headers.get('x-forwarded-for') ||
      request.ip ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Compose submission record
    const submission = {
      // id: submissionId, // Now omitted - let Supabase handle it
      name: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone || null,
      organization: validatedData.organization || null,
      organization_type: validatedData.organizationType || null,
      message: validatedData.surveyNeeds || null,
      created_at: now,
      // ip_address and user_agent only if those columns exist; otherwise keep removed
    };

    // === SUPABASE CONFIG ===
    const supabaseUrl =
      process.env.SUPABASE_URL ||
      'https://aakwxwkplicwljiahwzv.supabase.co';
    const supabaseAnonKey =
      process.env.SUPABASE_ANON_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFha3d4d2twbGljd2xqaWFod3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjE3NzMsImV4cCI6MjA2ODA5Nzc3M30.BPi2rYFsr4q9B44aYh9RxkDkAz27f7iUEHlQRnMMIaI';
    const table = process.env.SUPABASE_TABLE_DEMO_REQUESTS || 'demo_requests';

    // === SUPABASE INSERT ===
    const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify([submission]),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Supabase insert failed:', text);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save demo submission to Supabase.',
          error: text,
        },
        { status: res.status }
      );
    }

    // Success
    return NextResponse.json(
      {
        success: true,
        message:
          "Demo request submitted successfully! We'll contact you within 24 hours.",
        // submissionId, // don't return removed id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    const isValidation = (error as Error).name === 'ZodError';
    return NextResponse.json(
      {
        success: false,
        message: isValidation
          ? 'Please check your form data and try again.'
          : 'An error occurred while submitting your request.',
        error: (error as Error).message || String(error),
      },
      { status: isValidation ? 400 : 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
