export interface Theme {
  id: string;
  title: string;
  subtitle: string;
}

export interface Question {
  question: string;
  options: string[];
}

export interface Answer {
  question: string;
  answer: string;
}

export type Screen =
  | 'home'
  | 'know-yourself-theme'
  | 'know-yourself-questions'
  | 'know-yourself-loading'
  | 'know-yourself-result'
  | 'reality-check-situation'
  | 'reality-check-action'
  | 'reality-check-loading'
  | 'reality-check-result';

export interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}
