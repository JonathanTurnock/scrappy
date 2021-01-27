import React from "react"
import { Text } from "@fluentui/react"
import styled from "styled-components"
import { palette, sizing } from "../../theme"

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: inherit;
`

export const ListItem = styled.div`
  height: ${sizing.height.standard};
  min-height: ${sizing.height.standard};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: inherit;

  &.selected {
    background: ${palette.neutralLight} !important;
  }

  &:hover {
    background: ${palette.neutralLight};
  }
`

export const ListItemPrimaryContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  align-items: center;
  padding-left: 5px;
`

export const ListItemSecondaryContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 0;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
`

const ListTitleText = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: rgb(50, 49, 48);
  line-height: 27px;
  font-style: normal;
  letter-spacing: 0;
  text-align: left;
`

const ListTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  height: ${sizing.height.standard};
  min-height: ${sizing.height.standard};
`

const ListContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
`

export type IList = {
  title?: string
  onTitleClick?: () => void
}
export const FdList: React.FC<IList> = ({ title, onTitleClick, children }) => {
  return (
    <ListContainer>
      {title && (
        <ListTitle onClick={onTitleClick}>
          <ListItemPrimaryContent>
            <ListTitleText>{title}</ListTitleText>
          </ListItemPrimaryContent>
        </ListTitle>
      )}
      <ListContent>{children}</ListContent>
    </ListContainer>
  )
}
