'use client';

// Lazy load pdfjs-dist in browser to extract text from public/ or root PDF file

export type PdfPageText = { pageNumber: number; text: string };
export type PdfExtractResult = { pages: PdfPageText[] };

export async function extractPdfText(url: string): Promise<PdfExtractResult> {
  const pdfjs: any = await import('pdfjs-dist');
  // Use jsDelivr worker to avoid bundling issues with Turbopack and version gaps on cdnjs
  const ver = pdfjs.version || '3.11.174';
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${ver}/build/pdf.worker.min.js`;

  const loadingTask = pdfjs.getDocument(url);
  const pdf = await loadingTask.promise;
  const pages: PdfPageText[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((it: any) => ('str' in it ? it.str : (it as any).toString()));
    const text = strings.join(' ');
    pages.push({ pageNumber: i, text });
  }
  return { pages };
}

export type Chunk = { id: string; page: number; text: string };

export function chunkPages(pages: PdfPageText[], maxLen = 900, overlap = 120): Chunk[] {
  const chunks: Chunk[] = [];
  for (const p of pages) {
    const t = p.text.replace(/\s+/g, ' ').trim();
    let start = 0;
    let cid = 0;
    while (start < t.length) {
      const end = Math.min(t.length, start + maxLen);
      const piece = t.slice(start, end);
      chunks.push({ id: `${p.pageNumber}-${cid++}`, page: p.pageNumber, text: piece });
      if (end === t.length) break;
      start = end - overlap;
    }
  }
  return chunks;
}


