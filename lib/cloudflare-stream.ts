/**
 * Cloudflare Stream API Client
 * 
 * Documentación: https://developers.cloudflare.com/stream/
 */

export interface CloudflareStreamUploadResponse {
  result: {
    uid: string
    thumbnail: string
    readyToStream: boolean
    status: {
      state: string
      pctComplete: string
    }
    meta: {
      name?: string
    }
    created: string
    modified: string
    size: number
    duration: number
    input: {
      width: number
      height: number
      duration: number
    }
    playback: {
      hls: string
      dash: string
    }
    watermark?: string
  }
  success: boolean
  errors: any[]
  messages: any[]
}

export interface CloudflareStreamVideo {
  uid: string
  thumbnail: string
  readyToStream: boolean
  status: {
    state: string
    pctComplete: string
  }
  meta: {
    name?: string
  }
  created: string
  modified: string
  size: number
  duration: number
  input: {
    width: number
    height: number
    duration: number
  }
  playback: {
    hls: string
    dash: string
  }
}

// Este módulo se importa desde el cliente: no debe leer tokens de API.
// Cualquier operación autenticada contra Cloudflare va en una función de api/
// que lea process.env.CLOUDFLARE_API_TOKEN (sin prefijo VITE_).

/**
 * Get the embed URL for a video (for iframe embedding)
 * Can be used on client side
 */
export function getStreamEmbedUrl(
  uid: string,
  accountId?: string,
  options?: {
    autoplay?: boolean
    controls?: boolean
    loop?: boolean
    muted?: boolean
    preload?: "auto" | "metadata" | "none"
    poster?: string
  }
): string {
  // Usar siempre iframe.videodelivery.net (funciona sin Account ID)
  const params = new URLSearchParams()
  if (options?.autoplay) params.append("autoplay", "true")
  if (options?.controls !== undefined) params.append("controls", options.controls.toString())
  if (options?.loop) params.append("loop", "true")
  if (options?.muted) params.append("muted", "true")
  if (options?.preload) params.append("preload", options.preload)
  if (options?.poster) params.append("poster", options.poster)

  const queryString = params.toString()
  return `https://iframe.videodelivery.net/${uid}${queryString ? `?${queryString}` : ""}`
}

