# solid-telegram-auth-button

Unstyled headless solid-js component

To install:

```bash
bun add solid-telegram-auth-button
```

To use:

```tsx
import { TelegramLoginButton } from 'solid-telegram-auth-button'
// Basic use
<TelegramLoginButton
  onAuth={user => console.log('got telegram user', user)}
  botNickname='Sample_bot'
/>
// you can pass additional props to customize element
<TelegramLoginButton
  onAuth={user => console.log('got telegram user', user)}
  botNickname='Sample_bot'
  class='bg-green-400 text-left'
  loadingElement='Telegram auth script is loading'
>
  <span class='text-white'>Login with Telegram!</span>
</TelegramLoginButton>
```

This project use `supreme` code style and bootstraped with just `bunx eslint-config-supreme init`

This project was created using `bun init` in bun v0.4.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
