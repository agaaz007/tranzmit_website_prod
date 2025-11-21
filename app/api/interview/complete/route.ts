import { NextRequest, NextResponse } from "next/server"
import { uploadToS3, getPresignedUploadUrl, getPublicUrl } from "@/lib/services/s3"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const videoFile = formData.get("video") as File | null
    const history = formData.get("history") as string
    const userInfo = formData.get("userInfo") as string // JSON string of user details

    if (!videoFile || !history || !userInfo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = JSON.parse(userInfo)
    // Create a clean timestamp: YYYY-MM-DD_HH-MM-SS
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").replace("T", "_").replace("Z", "")
    const safeName = user.name.replace(/[^a-zA-Z0-9]/g, "_")
    const folder = `interviews/${safeName}_${timestamp}`

    console.log(`Processing interview completion for ${user.name} (${user.email || 'no email'})`)

    // 1. Upload Video (small files can go direct, large files use presigned URL)
    let videoUrl: string
    const videoSize = videoFile.size

    if (videoSize < 10 * 1024 * 1024) { // Less than 10MB, upload directly
      const videoKey = `${folder}/session.webm`
      console.log(`Uploading small video directly to ${videoKey}...`)
      videoUrl = await uploadToS3(Buffer.from(await videoFile.arrayBuffer()), videoKey, "video/webm")
    } else { // Large files - generate presigned URL for client to upload
      const videoKey = `${folder}/session.webm`
      console.log(`Generating presigned URL for large video ${videoKey}...`)
      const presignedUrl = await getPresignedUploadUrl(videoKey, "video/webm", 3600) // 1 hour expiry

      // Upload to S3 using presigned URL
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: videoFile,
        headers: {
          'Content-Type': 'video/webm'
        }
      })

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload video: ${uploadResponse.status}`)
      }

      videoUrl = getPublicUrl(videoKey)
      console.log(`Large video uploaded successfully to ${videoUrl}`)
    }

    // 2. Upload Transcript/History
    const historyKey = `${folder}/transcript.json`
    const historyBuffer = Buffer.from(history)
    const historyUrl = await uploadToS3(historyBuffer, historyKey, "application/json")
    console.log(`Transcript uploaded to ${historyUrl}`)

    // 3. Upload Metadata
    const metaKey = `${folder}/metadata.json`
    const metaBuffer = Buffer.from(JSON.stringify({
      user,
      timestamp: new Date().toISOString(),
      videoUrl,
      historyUrl,
      videoSize: videoFile.size,
      folder
    }, null, 2))
    const metaUrl = await uploadToS3(metaBuffer, metaKey, "application/json")
    console.log(`Metadata uploaded to ${metaUrl}`)

    console.log(`✅ Interview completion successful for ${user.name}`)

    return NextResponse.json({
      success: true,
      videoUrl,
      historyUrl,
      folder
    })

  } catch (error) {
    console.error("Completion Error:", error)
    return NextResponse.json({
      error: "Failed to save interview data",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
