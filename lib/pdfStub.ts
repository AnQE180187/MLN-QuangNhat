// Placeholder for future PDF parsing integration.
// Intended flow: use a server action/route to read `mln.pdf`, extract text (pdfjs-dist),
// split by headings, then feed into search index.

export type PdfExtract = {
  pages: { pageNumber: number; text: string }[];
};

export async function tryExtractPdf(): Promise<PdfExtract | null> {
  // Not implemented in MVP to avoid extra dependency install.
  // Return null to signal fallback to seed content.
  return null;
}



