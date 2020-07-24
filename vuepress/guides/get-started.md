# Get Started

Moonshard provide an opinionated API over [fastify](https://fastify.io) framework,
it was created to allow fast development phase and incredible performance.

To start a server just execute the `start` function:

```typescript
import {start} from 'moonshard';

start(3000);
```

## Create our first controller

```typescript
import {Controller, Get} from 'moonshard';

@Controller()
export class App {
  @Get()
  helloWord() {
    return 'hello world';  
  }
}
```

Now just run the `dev` to start development and check the dev server at http://localhost:3000.

That's it.