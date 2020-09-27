import { Injectable } from '../../src'

@Injectable()
export class CatsService {
  findOne(id: string | number): string {
    return `This action returns a #${id} cat`
  }
}
