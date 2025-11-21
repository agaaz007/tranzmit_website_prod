// Test script to verify S3 upload functionality
// Run with: node test-s3.js

require('dotenv').config({ path: '.env.local' });

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

function getS3Client() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
  const region = process.env.AWS_REGION?.trim();

  if (!accessKeyId || !secretAccessKey || !region) {
    throw new Error("AWS credentials not found or incomplete");
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}

async function uploadToS3(file, key, contentType) {
  const client = getS3Client();
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME not set");
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: contentType
  });

  const result = await client.send(command);
  console.log(`Successfully uploaded ${key} to ${bucketName}`);
  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

async function testS3Upload() {
  console.log('🧪 Testing S3 Upload Functionality');
  console.log('=====================================');

  try {
    // Check environment variables
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    console.log('Environment Variables:');
    console.log(`  AWS_ACCESS_KEY_ID: ${accessKeyId ? '✅ Set' : '❌ Missing'}`);
    console.log(`  AWS_SECRET_ACCESS_KEY: ${secretAccessKey ? '✅ Set' : '❌ Missing'}`);
    console.log(`  AWS_REGION: ${region || '❌ Missing'}`);
    console.log(`  AWS_S3_BUCKET_NAME: ${bucketName || '❌ Missing'}`);
    console.log('');

    if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
      console.error('❌ Missing required environment variables');
      return;
    }

    // Create a small test file
    const testData = JSON.stringify({
      test: true,
      timestamp: new Date().toISOString(),
      message: 'This is a test upload from Tranzmit AI Interview System'
    }, null, 2);

    const testBuffer = Buffer.from(testData);

    // Generate a unique test key
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').replace('Z', '');
    const testKey = `tests/test-upload-${timestamp}.json`;

    console.log(`📤 Uploading test file to: s3://${bucketName}/${testKey}`);
    console.log(`📏 File size: ${testBuffer.length} bytes`);

    // Upload the test file
    const resultUrl = await uploadToS3(testBuffer, testKey, 'application/json');

    console.log('');
    console.log('✅ SUCCESS! Test file uploaded successfully');
    console.log(`🔗 File URL: ${resultUrl}`);
    console.log('');
    console.log('🎉 S3 upload is working correctly!');
    console.log('Your AWS credentials and bucket configuration are valid.');
    console.log('');
    console.log('You can now proceed with the interview system.');

  } catch (error) {
    console.log('');
    console.log('❌ ERROR: S3 Upload Failed');
    console.log('=====================================');
    console.log('Error details:', error.message || error);
    console.log('');
    console.log('🔍 Troubleshooting Tips:');
    console.log('1. Check if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are correct');
    console.log('2. Verify AWS_REGION matches your S3 bucket region');
    console.log('3. Ensure the AWS_S3_BUCKET_NAME exists and you have write permissions');
    console.log('4. Check if your AWS user has s3:PutObject permission');
    console.log('5. Verify your system clock is accurate (time sync issues can cause signature errors)');
    console.log('');
    console.log('You can test your AWS credentials with:');
    console.log('  aws sts get-caller-identity');
    console.log('Or check your S3 bucket with:');
    console.log('  aws s3 ls s3://YOUR_BUCKET_NAME/');
  }
}

// Run the test
testS3Upload().catch(console.error);
