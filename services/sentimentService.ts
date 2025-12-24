import { SentimentResult, SentimentType } from '../types';

const POSITIVE_WORDS = [
  'good', 'bueno', 'great', 'genial', 'excelent', 'excelente' ,'happy', 'feliz', 'love', 'amo' , 'awesome', 'impresionante', 'fantastic', 'fantastico' ,
   'nice', 'agradable', 'amazing', 'increible', 'positive', 'positivo', 'like', 'gustar', 'wonderful', 'extraordinario', 'best', 'mejor'
];

const NEGATIVE_WORDS = [
  'bad', 'malo', 'terrible', 'lamentable', 'awful', 'espantoso', 'hate', 'odio', 'sad', 'triste', 'angry', 'enojado', 'horrible', 'worst', 'peor', 
  'negative', 'negativo', 'dislike', 'disguto', 'bug', 'error', 'problem', 'problema'
];

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function findSentenceWith(words: string[], text: string) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    const t = s.toLowerCase();
    if (words.some(w => t.includes(w))) return s.trim();
  }
  return null;
}

export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
  const input = (text || '').trim();

  // Very small heuristic-based analyzer for local/dev usage
  const tokens = input.toLowerCase().split(/\W+/).filter(Boolean);
  let positive = 0;
  let negative = 0;
  for (const t of tokens) {
    if (POSITIVE_WORDS.includes(t)) positive += 1;
    if (NEGATIVE_WORDS.includes(t)) negative += 1;
  }

  const neutral = Math.max(0, tokens.length - positive - negative);
  const total = positive + neutral + negative || 1;

  // Score centered at 50; shift up/down by relative difference
  const raw = 50 + ((positive - negative) / total) * 50;
  const score = clamp(Math.round(raw), 0, 100);

  let sentiment = SentimentType.NEUTRAL;
  if (positive > negative && positive >= 1) sentiment = SentimentType.POSITIVE;
  if (negative > positive && negative >= 1) sentiment = SentimentType.NEGATIVE;

  const bestSnippet = findSentenceWith(POSITIVE_WORDS, input) || input.slice(0, 120) || 'No content';
  const worstSnippet = findSentenceWith(NEGATIVE_WORDS, input) || input.slice(0, 120) || 'No content';
  const neutralSentence = (() => {
    const s = input.split(/(?<=[.!?])\s+/).find(sn => {
      const t = sn.toLowerCase();
      return !POSITIVE_WORDS.some(w => t.includes(w)) && !NEGATIVE_WORDS.some(w => t.includes(w));
    });
    return s?.trim() || (input.slice(0, 120) || 'No neutral excerpt');
  })();

  return {
    sentiment,
    score,
    bestSnippet,
    worstSnippet,
    randomNeutral: neutralSentence,
    breakdown: {
      positive,
      neutral,
      negative,
    }
  };
};
