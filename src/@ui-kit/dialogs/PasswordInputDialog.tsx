import React, { useMemo, useRef, useState } from "react"
import isStrongPassword from "validator/lib/isStrongPassword"

import {
  Dialog,
  DialogFooter,
  DialogType,
  ITextField,
  PrimaryButton,
  TextField,
} from "@fluentui/react"
import { AwaitableDialogProps } from "../types"
import reactModal from "@prezly/react-promise-modal"
import { Key } from "ts-key-enum"

const dialogStyles = { main: { maxWidth: 450 } }
const modalProps = {
  isBlocking: false,
  styles: dialogStyles,
}

export type IPasswordInputDialog = {
  title: string
  label: string
  requirements?: {
    minLength?: number
    minLowercase?: number
    minUppercase?: number
    minNumbers?: number
    minSymbols?: number
  }
}
export const PasswordInputDialog: React.FC<IPasswordInputDialog & AwaitableDialogProps<string>> = ({
  title,
  label,
  requirements = {
    minLength: 9,
    minLowercase: 2,
    minUppercase: 2,
    minNumbers: 0,
    minSymbols: 1,
  },
  hidden,
  onSubmit,
}) => {
  const [okDisabled, setOkDisabled] = useState(true)
  const input = useRef<ITextField>()
  const dialogContentProps = useMemo(
    () => ({
      type: DialogType.normal,
      title,
      closeButtonAriaLabel: "Close",
    }),
    [title]
  )

  const handleSubmit = () => {
    input.current?.value ? onSubmit(input.current.value) : onSubmit("")
  }

  const getErrorMessage = (value: string): string | undefined => {
    const result = isStrongPassword(value, requirements)
    if (!result) {
      setOkDisabled(true)
      if (value.length > 2) return "Weak Password!"
    } else {
      setOkDisabled(false)
    }
  }

  return (
    <>
      <Dialog
        hidden={hidden}
        onDismiss={undefined}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <TextField
          type="password"
          canRevealPassword
          // @ts-ignore
          componentRef={input}
          label={label}
          onKeyPress={({ key }) => key === Key.Enter && !okDisabled && handleSubmit()}
          onGetErrorMessage={getErrorMessage}
        />
        <DialogFooter>
          <PrimaryButton onClick={() => handleSubmit()} text="Ok" disabled={okDisabled} />
        </DialogFooter>
      </Dialog>
    </>
  )
}

export const passwordInput = ({ title, label }: IPasswordInputDialog) =>
  reactModal(({ show, onSubmit, onDismiss }) => (
    <PasswordInputDialog
      title={title}
      label={label}
      hidden={!show}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  )) as Promise<string>
