import React, { useMemo } from "react"

import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from "@fluentui/react"
import reactModal from "@prezly/react-promise-modal"
import { AwaitableDialogProps } from "../types"

const dialogStyles = { main: { maxWidth: 450 } }
const modalProps = {
  isBlocking: false,
  styles: dialogStyles,
}

export type IConfirmationDialog = {
  title: string
  text: string
}
export const FdConfirmationDialog: React.FC<
  IConfirmationDialog & AwaitableDialogProps<boolean>
> = ({ title, text, hidden, onSubmit, onDismiss }) => {
  const dialogContentProps = useMemo(
    () => ({
      type: DialogType.normal,
      title,
      closeButtonAriaLabel: "Close",
      subText: text,
    }),
    [text, title]
  )

  return (
    <>
      <Dialog
        hidden={hidden}
        onDismiss={onDismiss}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => onSubmit(true)} text="Ok" />
          <DefaultButton onClick={onDismiss} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  )
}

export const fdConfirm = ({ title, text }: IConfirmationDialog) =>
  reactModal(({ show, onSubmit, onDismiss }) => (
    <FdConfirmationDialog
      title={title}
      text={text}
      hidden={!show}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  )) as Promise<boolean>
