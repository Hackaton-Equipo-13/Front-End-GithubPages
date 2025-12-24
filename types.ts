
export enum SentimentType {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  NEON = 'neon'
}

export enum Language {
  ES = 'es',
  EN = 'en',
  PT = 'pt'
}

export interface SentimentResult {
  sentiment: SentimentType;
  score: number; // 0 to 100
  bestSnippet: string;
  worstSnippet: string;
  randomNeutral: string;
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface ConnectionConfig {
  endpoint: string;
  port: string;
}
