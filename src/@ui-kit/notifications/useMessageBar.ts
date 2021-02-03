import { useState } from "react"
import { MessageBarType } from "@fluentui/react"

export type IMessage = { content: string; type: MessageBarType }
export type IUseMessageBarCallbacks = {
  showMessage: (content: string, type?: MessageBarType, timeout?: number) => void
  dismissMessage: () => void
}

export const useMessageBar = (): [IMessage | undefined, IUseMessageBarCallbacks] => {
  const [message, setMessage] = useState<IMessage>()

  const showMessage = (content: string, type = MessageBarType.info, timeout = 3000) => {
    setMessage({ content, type })

    setTimeout(() => {
      setMessage(undefined)
    }, timeout)
  }

  const dismissMessage = () => {
    setMessage(undefined)
  }

  return [message, { showMessage, dismissMessage }]
}
