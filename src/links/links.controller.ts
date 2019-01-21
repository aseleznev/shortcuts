import { Controller, Get, Post, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':id')
  findOne(@Param() params, @Res() result): Promise<CreateLinkDto> {
    return this.linksService
      .getOne(params.id)
      .then(res => result.json(res))
      .catch(err => result.json(err));
  }

  @Post('/link')
  async create(@Body() createLinkDto: CreateLinkDto, @Res() result): Promise<CreateLinkDto> {
    console.log(createLinkDto);
    return this.linksService.createLink(new CreateLinkDto(createLinkDto)).then(res => result.json(res));
    //.catch(result.status(HttpStatus.BAD_REQUEST).send());
  }
}
