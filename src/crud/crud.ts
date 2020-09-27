import { Model, model, Document } from 'm16'
import { Body, Delete, Get, Param, Patch, Post, Put } from '../decorators'
import { transformAndValidate } from '../utils/class-transformer-validator'
import { BadRequestError } from '../error-handling/errors/bad-request-error'

interface CrudOptions {
  createDTO?: unknown
  updateDto?: unknown
}

export abstract class Crud<T extends Document = any> {
  Model: Model<T>
  createDto
  updateDto
  constructor(public Document: new (data: any) => T, options: CrudOptions = {}) {
    this.Model = model(Document)
    this.createDto = options.createDTO
    this.updateDto = options.updateDto
  }

  @Get()
  list() {
    return this.Model.find()
  }

  @Get('/:id')
  show(@Param('id') id: string) {
    return this.Model.findOne({ _id: id })
  }

  @Post()
  async create(@Body() body) {
    try {
      let document: any = await transformAndValidate(this.createDto || this.Document, body)
      if (!(document instanceof Document)) {
        document = new this.Document(document)
      }
      return await document.save()
    } catch (errors) {
      throw new BadRequestError(errors)
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: number | string, @Body() body) {
    if (this.updateDto) {
      try {
        await transformAndValidate(this.updateDto, body)
      } catch (errors) {
        throw new BadRequestError(errors)
      }
    }
    return this.Model.findOneAndUpdate({ _id: id }, { $set: body })
  }

  @Put('/:id')
  async replace(@Param('id') id: string, @Body() body) {
    try {
      let document: any = await transformAndValidate(this.createDto || this.Document, body)
      if (!(document instanceof Document)) {
        document = new this.Document(document)
      }
      return this.Model.findOneAndReplace({ _id: id }, document)
    } catch (errors) {
      throw new BadRequestError(errors)
    }
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.Model.findOneAndDelete({ _id: id })
  }
}
