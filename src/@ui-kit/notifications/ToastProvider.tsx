import React, { createContext } from "react"
import { MessageBar, MessageBarType, Stack } from "@fluentui/react"
import { useMessageBar } from "./useMessageBar"

export type ToastOptions = {
  type?: MessageBarType
  timeout?: number
}
export type IToastActions = {
  showToast: (content: string, options: ToastOptions) => void
}
export const ToastContext = createContext<IToastActions>({
  showToast: (content, options) => {
    console.log(content, options)
  },
})

export type IToastProvider = {}
export const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
  const [message, { showMessage, dismissMessage }] = useMessageBar()

  const showToast = (content: string, { type, timeout }: ToastOptions) => {
    showMessage(content, type, timeout)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <Stack
          style={{
            position: "fixed",
            bottom: "100px",
            width: "100vw",
          }}
          horizontalAlign={"center"}
        >
          <Stack>
            <MessageBar onDismiss={dismissMessage} messageBarType={message.type}>
              {message.content}
            </MessageBar>
          </Stack>
        </Stack>
      )}
    </ToastContext.Provider>
  )
}
