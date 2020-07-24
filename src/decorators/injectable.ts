import 'reflect-metadata'
import { MOONSHARD_INJECTABLE } from '../utils/constants'

export function injectableInstance(instance): void {
  Reflect.defineMetadata(MOONSHARD_INJECTABLE, instance, instance.constructor)
}

export function getIntance<T>(target: new () => T): T {
  return Reflect.getMetadata(MOONSHARD_INJECTABLE, target)
}

export function Injectable() {
  return (target: any) => {
    const newConstructor = spellbook(target) || target
    Reflect.defineMetadata(MOONSHARD_INJECTABLE, new newConstructor(), newConstructor)
    return newConstructor
  }
}

export function spellbook(target) {
  const paramTypes: any[] = Reflect.getOwnMetadata('design:paramtypes', target)
  if (paramTypes) {
    const newArgs = paramTypes.map((param) => {
      const currentInstance = Reflect.getMetadata(MOONSHARD_INJECTABLE, param)
      if (currentInstance) {
        return currentInstance
      }
    })
    return target.bind(null, ...newArgs)
  }
  return Reflect.getMetadata(MOONSHARD_INJECTABLE, target)
}
