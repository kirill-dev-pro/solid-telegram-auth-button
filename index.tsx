import { createEffect, createSignal, JSX, Show } from 'solid-js'

type TelegramUser = {
  auth_date: number
  first_name: string
  hash: string
  id: number
  photo_url: string
  username: string
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    Telegram: {
      Login: {
        auth: (
          options: { bot_id: number },
          callback: (user: TelegramUser) => void,
        ) => void
      }
    }
  }
}

export function TelegramLoginButton({
  onAuth,
  botNickname = 'sample_bot',
  loadingElement = <pre>Loading...</pre>,
  children = 'Login with Telegram',
  ...rest
}: JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  onAuth: (user: TelegramUser) => void
  botNickname: string
  loadingElement?: JSX.Element
}) {
  const [loading, setLoading] = createSignal(true)
  let container: HTMLDivElement

  createEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?21'
    script.async = true
    script.setAttribute('data-telegram-login', botNickname)
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-request-access', 'write')
    const div = document.createElement('div')
    div.setAttribute('id', 'telegram_login')
    // div.style.display = 'none'
    container.appendChild(div)
    div.appendChild(script)

    script.addEventListener('load', () => setLoading(false))
  })

  function onLoginWithTelegram() {
    // @ts-ignore
    window.Telegram.Login.auth(
      { bot_id: 5945464975 },
      (tgUser: TelegramUser) => {
        if (!tgUser) {
          console.error('Error logging in with Telegram')
          return
        }
        onAuth(tgUser)
      },
    )
  }

  return (
    <button onClick={onLoginWithTelegram} disabled={loading()} {...rest}>
      <Show when={!loading()} fallback={loadingElement}>
        {children}
      </Show>
      <div
        id='telegram-login-button'
        ref={container!}
        style={{ display: 'none' }}
      />
    </button>
  )
}
