import { getIntance, injectableInstance } from '../src/decorators'

describe('Injectable Test', () => {
  test('Injectable from instance', () => {
    class A {
      getName() {
        return 'john'
      }
    }
    const a = new A()
    injectableInstance(a)

    class B {
      constructor(public a?: A) {}
    }

    const b = new B()

    if (b.a) {
      expect(b.a.getName()).toBe(a.getName())
    }

    const aInstance = getIntance(A)
    expect(aInstance.getName()).toBe(a.getName())
  })
})
