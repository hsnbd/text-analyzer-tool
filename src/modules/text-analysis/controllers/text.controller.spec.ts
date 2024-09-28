import { Test, TestingModule } from '@nestjs/testing';
import { CreateTextDto } from '../dto/create-text.dto';
import { TextController } from './text.controller';
import { TextModel } from '../models/text.model';
import { TextService } from '../services/text.service';
import { IAuthUser } from '../../../core/interfaces/auth-user';
import { UpdateTextDto } from '../dto/update-text.dto';

describe('TextController', () => {
  let textController: TextController;
  let textService: TextService;
  const authUser: IAuthUser = {
    id: 1,
    sso_id: '4cca4c93-6b48-4099-a743-3e5c40030f57',
    full_name: 'Testing User',
    email: 'testing@gmail.com',
  };

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
        // {
        //   provide: AuthGuard,
        //   useValue: {}, // FIXME: next time
        // },
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
      const result = {
        user_id: authUser.id,
        ...createTextDto,
      } as TextModel;

      jest
        .spyOn(textService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await textController.create(createTextDto, authUser)).toBe(result);
      expect(textService.create).toHaveBeenCalledWith(createTextDto, authUser);
    });
  });

  describe('findAll', () => {
    it('should call textService.findAll and return the result', async () => {
      const result = [];
      jest
        .spyOn(textService, 'findAll')
        .mockImplementation(() => Promise.resolve(result as Array<TextModel>));

      expect(await textController.findAll(authUser)).toBe(result);
      expect(textService.findAll).toHaveBeenCalledWith(authUser);
    });
  });

  describe('findOne', () => {
    it('should call textService.findOne with the correct id and return the result', async () => {
      const result = {
        user_id: authUser.id,
        text_body: 'hello',
      } as TextModel;

      jest
        .spyOn(textService, 'findOne')
        .mockImplementation(() => Promise.resolve(result as TextModel));

      expect(await textController.findOne(1, authUser)).toBe(result);
      expect(textService.findOne).toHaveBeenCalledWith(1, authUser);
    });
  });

  describe('update', () => {
    it('should call textService.update with the correct id and dto and return the result', async () => {
      const updateTextDto: UpdateTextDto = { text_body: 'Updated text' };
      const result = {
        user_id: authUser.id,
        text_body: 'hello',
      } as TextModel;

      jest
        .spyOn(textService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await textController.update(1, updateTextDto, authUser)).toBe(
        result,
      );
      expect(textService.update).toHaveBeenCalledWith(
        1,
        updateTextDto,
        authUser,
      );
    });
  });

  describe('remove', () => {
    it('should call textService.remove with the correct id and return the result', async () => {
      jest
        .spyOn(textService, 'remove')
        .mockImplementation(() => Promise.resolve(true));

      expect(await textController.remove(1, authUser)).toBe(true);

      expect(textService.remove).toHaveBeenCalledWith(1, authUser);
    });
  });
});
