import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextModel } from './models/text.model';
import { TextAnalysisController } from './controllers/text-analysis.controller';
import { TextAnalysisService } from './services/text-analysis.service';
import { TextController } from './controllers/text.controller';
import { TextService } from './services/text.service';

@Module({
  imports: [SequelizeModule.forFeature([TextModel])],
  controllers: [TextController, TextAnalysisController],
  providers: [TextService, TextAnalysisService],
  exports: [],
})
export class TextAnalysisModule {}
