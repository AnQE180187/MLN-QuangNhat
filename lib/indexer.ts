export type Doc = { id: string; text: string; meta?: any };

export type Index = {
  docs: Doc[];
  df: Map<string, number>;
  tf: Map<string, Map<string, number>>; // term -> (docId -> count)
};

const wordRe = /[\p{L}\p{N}][\p{L}\p{N}_-]+/gu;

function tokenize(text: string): string[] {
  return (text.toLowerCase().match(wordRe) ?? []).map((w) => w);
}

export function buildIndex(docs: Doc[]): Index {
  const df = new Map<string, number>();
  const tf = new Map<string, Map<string, number>>();
  for (const d of docs) {
    const seen = new Set<string>();
    for (const tok of tokenize(d.text)) {
      if (!tf.has(tok)) tf.set(tok, new Map());
      const posting = tf.get(tok)!;
      posting.set(d.id, (posting.get(d.id) ?? 0) + 1);
      if (!seen.has(tok)) {
        df.set(tok, (df.get(tok) ?? 0) + 1);
        seen.add(tok);
      }
    }
  }
  return { docs, df, tf };
}

export function search(index: Index, query: string, k = 8): Doc[] {
  const tokens = tokenize(query);
  const N = index.docs.length;
  const scores = new Map<string, number>();
  for (const t of tokens) {
    const posting = index.tf.get(t);
    if (!posting) continue;
    const df = index.df.get(t) ?? 1;
    const idf = Math.log((N + 1) / df);
    for (const [docId, freq] of posting.entries()) {
      const score = (scores.get(docId) ?? 0) + (1 + Math.log(freq)) * idf;
      scores.set(docId, score);
    }
  }
  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(([id]) => index.docs.find((d) => d.id === id)!)
    .filter(Boolean);
  return ranked;
}

export function chunkText(text: string, maxLen = 900, overlap = 120): Doc[] {
  const t = text.replace(/\s+/g, ' ').trim();
  const docs: Doc[] = [];
  let start = 0;
  let cid = 0;
  while (start < t.length) {
    const end = Math.min(t.length, start + maxLen);
    const piece = t.slice(start, end);
    docs.push({ id: `txt-${cid++}`, text: piece });
    if (end === t.length) break;
    start = end - overlap;
  }
  return docs;
}


