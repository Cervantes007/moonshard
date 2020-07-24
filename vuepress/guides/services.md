# Services

Services are the place where you must set your app logic.

## Define your first service

Create a file and call it `app.service.ts`, then copy/paste the code below inside it:

```typescript
import {Injectable} from 'moonshard';

@Injectable()
export class AppService {
  helloWorld(): string {
    return 'hello world'
  }
}
```

We just define the `AppService` class and decorate it with `@Injectable` decorator to can use it inside `Controllers` or other `Services`

Now go to the `app.controller.ts` and update it to use the `app.service.ts`, as shown below:

```typescript
import { Controller, Get } from 'moonshard';
import { AppService } from './app.service';

@Controller()
export class UsersController {
  constructor(private appService: AppService) {}

  @Get()
  helloWorld() {
    return this.appService.helloWorld()
  }
}
```

We just update the code to run the app logic from the `app.service.ts` instead of write it directly in the `Controller`.
This way you will build a easy to scale app.

