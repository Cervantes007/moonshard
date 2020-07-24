# Get Started

Athena's provide an opinionated REST API over [fastify](https://fastify.com) framework,
created to allow fast development phase and incredible performance.

To start a server just execute the `start` function:

```typescript
import {start} from 'athena';

start(3000);
```

## Create our first controller

```typescript
import {Controller, Get} from 'athena';

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