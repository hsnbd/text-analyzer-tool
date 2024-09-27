import { Test, TestingModule } from '@nestjs/testing';
import { CreateTextDto } from '../dto/create-text.dto';
import { UpdateTextDto } from '../dto/update-text.dto';
import { TextController } from './text.controller';
import { TextModel } from '../models/text.model';
import { TextService } from '../services/text.service';

describe('TextController', () => {
  let textController: TextController;
  let textService: TextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TextController],
      providers: [
        {
          provide: TextService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    textController = module.get(TextController);
    textService = module.get(TextService);
  });

  it('should be defined', () => {
    expect(textController).toBeDefined();
  });

  describe('create', () => {
    it('should call textService.create and return the result', async () => {
      const createTextDto: CreateTextDto = { text_body: 'Sample text' };

      jest
        .spyOn(textService, 'create')
        .mockImplementation(() => Promise.resolve(createTextDto as TextModel));

      expect(await textController.create(createTextDto)).toBe(createTextDto);
      expect(textService.create).toHaveBeenCalledWith(createTextDto);
    });
  });

  describe('findAll', () => {
    it('should call textService.findAll and return the result', async () => {
      const result = [];
      jest
        .spyOn(textService, 'findAll')
        .mockImplementation(() => Promise.resolve(result as Array<TextModel>));

      expect(await textController.findAll()).toBe(result);
      expect(textService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call textService.findOne with the correct id and return the result', async () => {
      const result = { text_body: 'hello' };
      jest
        .spyOn(textService, 'findOne')
        .mockImplementation(() => Promise.resolve(result as TextModel));

      expect(await textController.findOne('1')).toBe(result);
      expect(textService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call textService.update with the correct id and dto and return the result', async () => {
      const updateTextDto: UpdateTextDto = { text_body: 'Updated text' };
      jest
        .spyOn(textService, 'update')
        .mockImplementation(() => Promise.resolve(updateTextDto as TextModel));

      expect(await textController.update('1', updateTextDto)).toBe(
        updateTextDto,
      );
      expect(textService.update).toHaveBeenCalledWith(1, updateTextDto);
    });
  });

  describe('remove', () => {
    it('should call textService.remove with the correct id and return the result', async () => {
      jest
        .spyOn(textService, 'remove')
        .mockImplementation(() => Promise.resolve(true));

      expect(await textController.remove('1')).toBe(true);

      expect(textService.remove).toHaveBeenCalledWith(1);
    });
  });
});
