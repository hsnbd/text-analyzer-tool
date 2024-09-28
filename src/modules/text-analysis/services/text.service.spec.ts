import { Test, TestingModule } from '@nestjs/testing';
import { CreateTextDto } from '../dto/create-text.dto';
import { UpdateTextDto } from '../dto/update-text.dto';
import { getModelToken } from '@nestjs/sequelize';
import { TextModel } from '../models/text.model';
import { TextService } from './text.service';
import { IAuthUser } from '../../../core/interfaces/auth-user';

describe('TextService', () => {
  let textService: TextService;
  let textModel: any;
  const authUser: IAuthUser = {
    id: 1,
    sso_id: '4cca4c93-6b48-4099-a743-3e5c40030f57',
    full_name: 'Testing User',
    email: 'testing@gmail.com',
  };

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

      const result = { user_id: authUser.id, ...createTextDto } as TextModel;

      jest
        .spyOn(textModel, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await textService.create(result, authUser)).toBe(result);
      expect(textModel.create).toHaveBeenCalledWith(result);
    });
  });

  describe('findAll', () => {
    it('should call textModel.findAll and return the result', async () => {
      const result = [];

      jest
        .spyOn(textModel, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await textService.findAll(authUser)).toBe(result);
      expect(textModel.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call textModel.findOne with the correct id and return the result', async () => {
      const result = {} as TextModel;
      jest
        .spyOn(textModel, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await textService.findOne(1, authUser)).toBe(result);
      expect(textModel.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call textModel.update with the correct id and dto and return the result', async () => {
      const updateTextDto: UpdateTextDto = { text_body: 'Updated text' };

      const mockTextModelInstance = {
        update: jest.fn().mockResolvedValue(updateTextDto),
      };

      jest
        .spyOn(textModel, 'findOne')
        .mockResolvedValue(mockTextModelInstance as any);

      const result = await textService.update(1, updateTextDto, authUser);

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
        .spyOn(textModel, 'findOne')
        .mockResolvedValue(mockTextModelInstance as any);

      const result = await textService.remove(1, authUser);

      expect(mockTextModelInstance.destroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});
