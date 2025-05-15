export const generateThumbnail = (file: File): Promise<string> =>
{
    return new Promise((resolve, reject) =>
    {
        const video = document.createElement("video")
        video.preload = "metadata"
  
        video.onloadedmetadata = () =>
        {
            // Seek to 0.5s to avoid black frame at the start
            if (video.duration < 0.5)
                video.currentTime = 0
            else
                video.currentTime = 0.5
        }
  
        video.onseeked = () =>
        {
            const canvas = document.createElement("canvas")
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
    
            const ctx = canvas.getContext("2d")
            if (!ctx) return reject("Failed to get canvas context")
    
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL("image/jpeg")
            resolve(dataUrl)
        }
  
        video.onerror = (err) => reject("Error loading video")
  
        video.src = URL.createObjectURL(file)
        // required for some browsers
        video.load()
    })
}