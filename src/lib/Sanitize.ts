import DOMPurify from 'dompurify'
// import { JSDOM } from 'jsdom'

export function sanitizeHTML(input: string): string {
    const { sanitize } = DOMPurify
    return sanitize(input)
}