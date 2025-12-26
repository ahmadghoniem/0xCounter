import { useState } from "react"

interface UseCopyToClipboardOptions {
  timeout?: number
}

export function useCopyToClipboard({ timeout = 1000 }: UseCopyToClipboardOptions = {}) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return
    }

    if (!value) {
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    } catch (error) {
      console.error("Failed to copy text: ", error)
      setIsCopied(false)
    }
  }

  return { isCopied, copyToClipboard }
}
