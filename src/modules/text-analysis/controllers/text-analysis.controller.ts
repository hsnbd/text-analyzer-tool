import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { TextService } from '../services/text.service';
import { TextAnalysisService } from '../services/text-analysis.service';

@Controller('/texts')
export class TextAnalysisController {
  @Inject()
  private readonly textService: TextService;
  @Inject()
  private readonly textAnalysisService: TextAnalysisService;

  @Get(':id/count-words')
  async countWords(@Param('id', ParseIntPipe) id: number): Promise<number> {
    const textData = await this.textService.findOne(id);
    return this.textAnalysisService.countWords(textData.text_body);
  }

  @Get(':id/count-characters')
  async countCharacters(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<number> {
    const textData = await this.textService.findOne(id);
    return this.textAnalysisService.countCharacters(textData.text_body);
  }

  @Get(':id/count-sentences')
  async countSentences(@Param('id', ParseIntPipe) id: number): Promise<number> {
    const textData = await this.textService.findOne(id);
    return this.textAnalysisService.countSentences(textData.text_body);
  }

  @Get(':id/count-paragraphs')
  async countParagraphs(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<number> {
    const textData = await this.textService.findOne(id);
    return this.textAnalysisService.countParagraphs(textData.text_body);
  }

  @Get(':id/longest-words-in-paragraphs')
  async longestWordsInParagraphs(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string[]> {
    const textData = await this.textService.findOne(id);
    return this.textAnalysisService.longestWordsInParagraphs(
      textData.text_body,
    );
  }
}
