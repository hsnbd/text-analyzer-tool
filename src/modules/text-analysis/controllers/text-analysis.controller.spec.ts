import { Test, TestingModule } from '@nestjs/testing';
import { TextAnalysisController } from './text-analysis.controller';
import { TextService } from '../services/text.service';
import { TextAnalysisService } from '../services/text-analysis.service';
import { TextModel } from '../models/text.model';
import { IAuthUser } from '../../../core/interfaces/auth-user';

describe('TextAnalysisController', () => {
  let textAnalysisController: TextAnalysisController;
  let textService: TextService;
  let textAnalysisService: TextAnalysisService;
  const authUser: IAuthUser = {
    id: 1,
    sso_id: '4cca4c93-6b48-4099-a743-3e5c40030f57',
    full_name: 'Testing User',
    email: 'testing@gmail.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextAnalysisController],
      providers: [
        {
          provide: TextService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: TextAnalysisService,
          useValue: {
            countWords: jest.fn(),
            countCharacters: jest.fn(),
            countSentences: jest.fn(),
            countParagraphs: jest.fn(),
            longestWordsInParagraphs: jest.fn(),
          },
        },
      ],
    }).compile();

    textAnalysisController = module.get(TextAnalysisController);
    textService = module.get(TextService);
    textAnalysisService = module.get(TextAnalysisService);
  });

  it('should be defined', () => {
    expect(textAnalysisController).toBeDefined();
  });

  describe('countWords', () => {
    it('should return the word count', async () => {
      const textData = { text_body: 'This is a test.' };

      jest
        .spyOn(textService, 'findOne')
        .mockImplementation(() => Promise.resolve(textData as TextModel));

      jest
        .spyOn(textAnalysisService, 'countWords')
        .mockImplementation(() => Promise.resolve(4));

      const result = await textAnalysisController.countWords(1, authUser);
      expect(result).toBe(4);
      expect(textService.findOne).toHaveBeenCalledWith(1, authUser);
      expect(textAnalysisService.countWords).toHaveBeenCalledWith(
        textData.text_body,
      );
    });
  });

  describe('countCharacters', () => {
    it('should return the character count', async () => {
      const textData = { text_body: 'This is a test.' };

      jest
        .spyOn(textService, 'findOne')
        .mockImplementation(() => Promise.resolve(textData as TextModel));

      jest
        .spyOn(textAnalysisService, 'countCharacters')
        .mockImplementation(() => Promise.resolve(15));

      const result = await textAnalysisController.countCharacters(1, authUser);
      expect(result).toBe(15);
      expect(textService.findOne).toHaveBeenCalledWith(1, authUser);
      expect(textAnalysisService.countCharacters).toHaveBeenCalledWith(
        textData.text_body,
      );
    });
  });

  describe('countSentences', () => {
    it('should return the sentence count', async () => {
      const textData = { text_body: 'This is a test. This is another test.' };

      jest
        .spyOn(textService, 'findOne')
        .mockImplementation(() => Promise.resolve(textData as TextModel));

      jest
        .spyOn(textAnalysisService, 'countSentences')
        .mockImplementation(() => Promise.resolve(2));

      const result = await textAnalysisController.countSentences(1, authUser);
      expect(result).toBe(2);
      expect(textService.findOne).toHaveBeenCalledWith(1, authUser);
      expect(textAnalysisService.countSentences).toHaveBeenCalledWith(
        textData.text_body,
      );
    });
  });

  describe('countParagraphs', () => {
    it('should return the paragraph count', async () => {
      const textData = {
        text_body: 'This is a test.\n\nThis is another test.',
      };

      jest
        .spyOn(textService, 'findOne')
        .mockImplementation(() => Promise.resolve(textData as TextModel));

      jest
        .spyOn(textAnalysisService, 'countParagraphs')
        .mockImplementation(() => Promise.resolve(2));

      const result = await textAnalysisController.countParagraphs(1, authUser);

      expect(result).toBe(2);
      expect(textService.findOne).toHaveBeenCalledWith(1, authUser);
      expect(textAnalysisService.countParagraphs).toHaveBeenCalledWith(
        textData.text_body,
      );
    });
  });

  describe('longestWordsInParagraphs', () => {
    it('should return the longest words in paragraphs', async () => {
      const textData = { text_body: 'This is a test for longest words.' };
      const longestWords = ['longest', 'words'];

      jest
        .spyOn(textService, 'findOne')
        .mockImplementation(() => Promise.resolve(textData as TextModel));

      jest
        .spyOn(textAnalysisService, 'longestWordsInParagraphs')
        .mockImplementation(() => Promise.resolve(longestWords));

      const result = await textAnalysisController.longestWordsInParagraphs(
        1,
        authUser,
      );
      expect(result).toEqual(longestWords);
      expect(textService.findOne).toHaveBeenCalledWith(1, authUser);
      expect(textAnalysisService.longestWordsInParagraphs).toHaveBeenCalledWith(
        textData.text_body,
      );
    });
  });
});
