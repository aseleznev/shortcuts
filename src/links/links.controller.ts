import { Controller, Get, Post, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':id')
  findOne(@Param() params): string {
    return this.linksService.getOne(params.id);
  }

  @Post('/link')
  async create(@Body() createLinkDto: CreateLinkDto, @Res() result): Promise<any> {
    return this.linksService.createLink(new CreateLinkDto(createLinkDto)).then(res => result.json(res));
  }
}