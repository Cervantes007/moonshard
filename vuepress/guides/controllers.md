# Controllers

Controllers are responsible for handling incoming requests and returning responses to the client.

A controller's purpose is to receive specific requests for the application. 
The routing mechanism controls which controller receives which requests. 
Frequently, each controller has more than one route, and different routes can perform different actions.

In order to create a basic controller, we use classes and decorators. 
Decorators associate classes with required metadata and enable Moonshard to create a routing map (tie requests to the corresponding controllers).


To define a `Controller` you need to steps.
1. create a file with a name ending on `.controller.ts` or `.ctrl.ts`. e.g. `app.controller.ts` or `app.ctrl.ts`,
2. Write a class inside the create file and decorate it with `@Controller()`.

## Your first controller

Your `app.controller.ts` file must look like this: 
```typescript
import {Controller} from 'moonshard';

@Controller()
export class AppController {
  // define your routes here.
}
```
`moonshard` is smart enough to load your controller before start the app.

## Write your first route

Inside the `user-controller.ts`, write a method and decorate with a http verb will handle the incoming request:

```typescript
import {Controller, Get} from 'moonshard';

@Controller()
export class UsersController {
  @Get()
  helloWorld() {
    return 'hello world'
  }
}
```

With the above code we create our first route, start the server and visit your app default route under http://localhost:3000,
you should see the message `hello world` in your browser.

