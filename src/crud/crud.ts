import { Model, model, Document } from 'm16'
import { Body, Delete, Get, Param, Patch, Post, Put } from '../decorators'

export abstract class Crud<T extends Document = any, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  Model: Model<T>
  constructor(public Document: new (data: any) => T) {
    this.Model = model(Document)
  }

  @Get()
  list() {
    return this.Model.find()
  }

  @Post()
  create(@Body() body: CreateDTO) {
    const document = new this.Document(body)
    return document.save()
  }

  @Patch(':id')
  update(@Param('id') id: number | string, @Body() body: Partial<T>) {
    const document = new this.Document(body)
    console.log(id)
    console.log(document)
    return this.Model.findOneAndUpdate({ _id: id }, { $set: document })
  }

  @Put(':id')
  replace(@Param('id') id: number | string, @Body() body: UpdateDTO) {
    const document = new this.Document(body)
    return this.Model.findOneAndReplace({ _id: id }, document)
  }

  @Delete(':id')
  remove(@Param('id') id: number | string) {
    return this.Model.findOneAndDelete({ _id: id })
  }
}
