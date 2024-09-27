import { Test, TestingModule } from '@nestjs/testing';
import { CreateTextDto } from '../dto/create-text.dto';
import { UpdateTextDto } from '../dto/update-text.dto';
import { getModelToken } from '@nestjs/sequelize';
import { TextModel } from '../models/text.model';
import { TextService } from './text.service';

describe('TextService', () => {
  let textService: TextService;
  let textModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        TextService,
        {
          provide: getModelToken(TextModel),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByPk: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    textService = module.get(TextService);
    textModel = module.get(getModelToken(TextModel));
  });

  it('should be defined', () => {
    expect(textService).toBeDefined();
  });

  describe('create', () => {
    it('should call textModel.create and return the result', async () => {
      const createTextDto: CreateTextDto = { text_body: 'Sample text' };

      jest
        .spyOn(textModel, 'create')
        .mockImplementation(() => Promise.resolve(createTextDto as TextModel));

      expect(await textService.create(createTextDto)).toBe(createTextDto);
      expect(textModel.create).toHaveBeenCalledWith(createTextDto);
    });
  });

  describe('findAll', () => {
    it('should call textModel.findAll and return the result', async () => {
      const result: Promise<Array<TextModel>> = textModel.findAll();
      jest
        .spyOn(textModel, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await textService.findAll()).toBe(result);
      expect(textModel.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call textModel.findOne with the correct id and return the result', async () => {
      const result = {} as TextModel;
      jest
        .spyOn(textModel, 'findByPk')
        .mockImplementation(() => Promise.resolve(result));

      expect(await textService.findOne(1)).toBe(result);
      expect(textModel.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call textModel.update with the correct id and dto and return the result', async () => {
      const updateTextDto: UpdateTextDto = { text_body: 'Updated text' };

      const mockTextModelInstance = {
        update: jest.fn().mockResolvedValue(updateTextDto),
      };

      jest
        .spyOn(textModel, 'findByPk')
        .mockResolvedValue(mockTextModelInstance as any);

      const result = await textService.update(1, updateTextDto);

      expect(mockTextModelInstance.update).toHaveBeenCalledWith(updateTextDto);
      expect(result).toBe(mockTextModelInstance);
    });
  });

  describe('remove', () => {
    it('should call textModel.destroy with the correct id and return the result', async () => {
      const mockTextModelInstance = {
        destroy: jest.fn().mockResolvedValue(true),
      };

      jest
        .spyOn(textModel, 'findByPk')
        .mockResolvedValue(mockTextModelInstance as any);

      const result = await textService.remove(1);

      expect(mockTextModelInstance.destroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});
