import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

function getS3Client() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim()
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim()
  const region = process.env.AWS_REGION?.trim()

  if (!accessKeyId || !secretAccessKey || !region) {
    throw new Error("AWS credentials not found or incomplete")
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  })
}

export async function getPresignedUploadUrl(key: string, contentType: string, expiresIn = 3600) {
  const client = getS3Client()
  const bucketName = process.env.AWS_S3_BUCKET_NAME

  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME not set")
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
    ACL: 'private' // or 'public-read' if you want public access
  })

  try {
    const signedUrl = await getSignedUrl(client, command, { expiresIn })
    console.log(`Generated presigned URL for ${key}`)
    return signedUrl
  } catch (error) {
    console.error("Presigned URL Error:", error)
    throw error
  }
}

export async function uploadToS3(file: Buffer | Blob, key: string, contentType: string) {
  const client = getS3Client()
  const bucketName = process.env.AWS_S3_BUCKET_NAME

  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME not set")
  }

  // Convert Blob to Buffer if necessary
  let body = file
  if (file instanceof Blob) {
     const arrayBuffer = await file.arrayBuffer()
     body = Buffer.from(arrayBuffer)
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType
  })

  try {
    await client.send(command)
    console.log(`Successfully uploaded ${key} to ${bucketName}`)
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  } catch (error) {
    console.error("S3 Upload Error:", error)
    throw error
  }
}

export function getPublicUrl(key: string) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME
  const region = process.env.AWS_REGION
  if (!bucketName || !region) {
    throw new Error("AWS_S3_BUCKET_NAME or AWS_REGION not set")
  }
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`
}
