import { Test, TestingModule } from '@nestjs/testing';
import { TextAnalysisService } from './text-analysis.service';

describe('TextAnalysisService', () => {
  let textAnalysisService: TextAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextAnalysisService],
    }).compile();

    textAnalysisService = module.get(TextAnalysisService);
  });

  it('should be defined', () => {
    expect(textAnalysisService).toBeDefined();
  });

  describe('countWords', () => {
    it('should return the correct word count', async () => {
      const result = await textAnalysisService.countWords('This is a test.');
      expect(result).toBe(4);
    });

    it('should return 0 for empty string', async () => {
      const result = await textAnalysisService.countWords('');
      expect(result).toBe(0);
    });
  });

  describe('countCharacters', () => {
    it('should return the correct character count', async () => {
      const result =
        await textAnalysisService.countCharacters('This is a test.');
      expect(result).toBe(15);
    });

    it('should return 0 for empty string', async () => {
      const result = await textAnalysisService.countCharacters('');
      expect(result).toBe(0);
    });
  });

  describe('countSentences', () => {
    it('should return the correct sentence count', async () => {
      const result = await textAnalysisService.countSentences(
        'This is a test. This is another test!',
      );
      expect(result).toBe(2);
    });

    it('should return 0 for empty string', async () => {
      const result = await textAnalysisService.countSentences('');
      expect(result).toBe(0);
    });
  });

  describe('countParagraphs', () => {
    it('should return the correct paragraph count', async () => {
      const result = await textAnalysisService.countParagraphs(
        'This is a test.\n\nThis is another test.',
      );
      expect(result).toBe(2);
    });

    it('should return 0 for empty string', async () => {
      const result = await textAnalysisService.countParagraphs('');
      expect(result).toBe(0);
    });
  });

  describe('longestWordsInParagraphs', () => {
    it('should return the longest word in each paragraph', async () => {
      const result = await textAnalysisService.longestWordsInParagraphs(
        'This is a test.\nThis is another test.',
      );
      expect(result).toEqual(['test.', 'another']);
    });

    it('should return an empty array for empty string', async () => {
      const result = await textAnalysisService.longestWordsInParagraphs('');
      expect(result).toEqual([]);
    });
  });
});
