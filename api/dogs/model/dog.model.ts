import { Document, document } from 'm16'
import { IsNumber, IsString } from 'class-validator'

@document()
export class Dog extends Document {
  @IsString() name: string
  @IsNumber() age: number
}
