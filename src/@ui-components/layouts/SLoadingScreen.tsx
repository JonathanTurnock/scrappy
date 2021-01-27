import { Spinner } from "@fluentui/react"
import React from "react"

export const SLoadingScreen: React.FC = () => {
  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <div>
        <Spinner label="Please wait..." />
      </div>
    </div>
  )
}
