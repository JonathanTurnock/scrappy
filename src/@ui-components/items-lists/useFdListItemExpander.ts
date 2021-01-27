import { useState } from "react"

export const useFdListItemExpander = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
  }

  return {
    isExpanded,
    onExpand: handleExpand,
    onCollapse: handleCollapse,
  }
}
