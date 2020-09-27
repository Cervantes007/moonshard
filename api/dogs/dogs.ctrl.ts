import { Dog } from './model/dog.model'
import { Controller, Crud } from '../../src'

@Controller('dogs')
export class DogCtrl extends Crud {
  constructor() {
    super(Dog)
  }
}
