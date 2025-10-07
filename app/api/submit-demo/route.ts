import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { demoFormSchema } from '@/lib/validation/demo-form-schema';
import { saveDemoSubmission } from '@/lib/services/dynamodb';
import { sendSubmissionNotification } from '@/lib/services/email';
import { ApiResponse } from '@/lib/types/form';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request body
    const validatedData = demoFormSchema.parse(body);
    
    // Create submission record
    const submissionId = uuidv4();
    const now = new Date().toISOString();
    
    const submission = {
      id: submissionId,
      submittedAt: now,
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone || undefined,
      organization: validatedData.organization || undefined,
      organizationType: validatedData.organizationType || undefined,
      surveyNeeds: validatedData.surveyNeeds || undefined,
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    };
    
    // Save to DynamoDB
    await saveDemoSubmission(submission);
    
    // Send email notification (non-blocking)
    sendSubmissionNotification(submission).catch((error) => {
      console.error('Email notification failed:', error);
    });
    
    const response: ApiResponse = {
      success: true,
      message: 'Demo request submitted successfully! We\'ll contact you within 24 hours.',
      submissionId: submissionId,
    };
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    console.error('API Error:', error);
    
    let message = 'An error occurred while submitting your request.';
    let status = 500;
    
    if (error instanceof Error && error.name === 'ZodError') {
      message = 'Please check your form data and try again.';
      status = 400;
    }
    
    const response: ApiResponse = {
      success: false,
      message: message,
    };
    
    return NextResponse.json(response, { status });
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}


