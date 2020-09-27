import { CreateCatDto } from './dto/create-cat.dto'
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  HttpCode,
  Reply,
  Request,
  Redirect,
  Header,
} from '../../src'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
  constructor(public catsService: CatsService) {}

  @Header('Access-Control-Allow-Origin', '*')
  @Post()
  @HttpCode(200)
  create(@Body() createCatDto: CreateCatDto): string {
    return `This action adds a new cat ${createCatDto.name}`
  }

  @Post('/many')
  @Header('Content-Type', 'application/json')
  createCats(@Body() createCatDto: any): string {
    return `This action adds a new cat ${createCatDto.name}`
  }

  @Get()
  findAll(@Query() query: any): string {
    return `This action returns all cats (limit: ${query.limit} items)`
  }

  @Get('/redirect')
  @Redirect('/')
  redirect(): string {
    return 'redirect'
  }

  @Get('/name/:name')
  findByName(@Request() request: any, @Reply() reply: any): Promise<string> {
    return reply.send(`This action returns cat by name ${request.params.name}`)
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.catsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: any): string {
    return `This action updates a #${id} cat ${updateCatDto}`
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`
  }
}
