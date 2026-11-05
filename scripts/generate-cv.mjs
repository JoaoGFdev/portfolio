// Prints the /[locale]/resume page to PDF files in public/cv.
//
// Usage: start the app (`pnpm dev` or `pnpm preview`), then run `pnpm cv`.
// BASE_URL picks another host; CHROME_PATH points at a Chromium binary when
// Playwright's own browser is not installed.
import { mkdir } from "node:fs/promises"

import { chromium } from "playwright-core"

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000"
const files = {
  pt: "public/cv/joao-guilherme-fonseca-curriculo.pdf",
  en: "public/cv/joao-guilherme-fonseca-resume.pdf",
}

await mkdir("public/cv", { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
})

try {
  const page = await browser.newPage()
  for (const [locale, path] of Object.entries(files)) {
    const url = `${baseUrl}/${locale}/resume`
    const response = await page.goto(url, { waitUntil: "networkidle" })
    if (!response?.ok()) throw new Error(`${url} answered ${response?.status()}`)
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({ path, format: "A4", printBackground: true, preferCSSPageSize: true })
    console.log(`${path} ← ${url}`)
  }
} finally {
  await browser.close()
}
