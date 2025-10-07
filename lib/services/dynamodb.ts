import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DemoSubmission } from '@/lib/types/form';

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'tranzmit-demo-submissions';

export async function saveDemoSubmission(data: DemoSubmission): Promise<void> {
  try {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        id: data.id,
        submittedAt: data.submittedAt,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        organization: data.organization || null,
        organizationType: data.organizationType || null,
        surveyNeeds: data.surveyNeeds || null,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
      },
    });

    await docClient.send(command);
    console.log(`Demo submission saved with ID: ${data.id}`);
  } catch (error) {
    console.error('Error saving demo submission:', error);
    throw new Error('Failed to save demo submission');
  }
}


