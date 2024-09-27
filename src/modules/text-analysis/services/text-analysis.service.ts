import { Injectable } from '@nestjs/common';

@Injectable()
export class TextAnalysisService {
  async countWords(text: string): Promise<number> {
    if (!text.length) {
      return 0;
    }

    return text.split(/\s+/).filter(Boolean).length;
  }

  async countCharacters(text: string): Promise<number> {
    return text.length;
  }

  async countSentences(text: string): Promise<number> {
    if (!text.length) {
      return 0;
    }
    return text.split(/[.!?]+/).filter(Boolean).length;
  }

  async countParagraphs(text: string): Promise<number> {
    if (!text.length) {
      return 0;
    }
    return text.split(/\n+/).filter(Boolean).length;
  }

  async longestWordsInParagraphs(text: string): Promise<string[]> {
    if (!text.length) {
      return [];
    }
    return text.split(/\n+/).map((paragraph) => {
      return paragraph.split(/\s+/).reduce((longest, word) => {
        return word.length > longest.length ? word : longest;
      }, '');
    });
  }
}
