import { Controller, Post, Body, Get, Query, Param, Put, Delete, HttpCode, Reply, Request } from '../../src'

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(200)
  create(@Body() createCatDto: any) {
    return `This action adds a new cat ${createCatDto.name}`
  }

  @Post('/many')
  createCats(@Body() createCatDto: any) {
    return `This action adds a new cat ${createCatDto.name}`
  }

  @Get()
  findAll(@Query() query: any) {
    return `This action returns all cats (limit: ${query.limit} items)`
  }

  @Get('/name/:name')
  findByName(@Request() request, @Reply() reply) {
    reply.send(`This action returns cat by name ${request.params.name}`)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: any) {
    return `This action updates a #${id} cat ${updateCatDto}`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`
  }
}
