import React, { useMemo, useRef } from "react"

import {
  DefaultButton,
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

export type IInputDialog = {
  title: string
  label: string
  placeholder?: string
  defaultValue?: string
}
export const FdInputDialog: React.FC<IInputDialog & AwaitableDialogProps<string>> = ({
  title,
  label,
  placeholder,
  defaultValue,
  hidden,
  onSubmit,
  onDismiss,
}) => {
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

  return (
    <>
      <Dialog
        hidden={hidden}
        onDismiss={onDismiss}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <TextField
          // @ts-ignore
          componentRef={input}
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onKeyPress={({ key }) => key === Key.Enter && handleSubmit()}
        />
        <DialogFooter>
          <PrimaryButton onClick={() => handleSubmit()} text="Ok" />
          <DefaultButton onClick={onDismiss} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  )
}

export const fdInput = ({ title, label, placeholder, defaultValue }: IInputDialog) =>
  reactModal(({ show, onSubmit, onDismiss }) => (
    <FdInputDialog
      title={title}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      hidden={!show}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  )) as Promise<string>