import React from "react"
import { Stack, Text } from "@fluentui/react"

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Stack verticalFill horizontalAlign={"center"} verticalAlign={"center"}>
          <Text variant={"xxLarge"}>😲</Text>
          <Text variant={"large"}>Something went wrong, please ensure the content is valid.</Text>
        </Stack>
      )
    }

    return this.props.children
  }
}
