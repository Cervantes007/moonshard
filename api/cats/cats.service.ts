import { Injectable } from '../../src'

@Injectable()
export class CatsService {
  findOne(id: string): string {
    return `This action returns a #${id} cat`
  }
}
