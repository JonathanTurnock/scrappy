import React, { useMemo } from "react"
import { INavLink, INavLinkGroup, Nav, Panel, PanelType } from "@fluentui/react"
import { useHistory } from "react-router-dom"
import { NavBrand } from "./components/NavBrand"

type IReactRouterNavLinkGroup = Omit<INavLinkGroup, "links"> & { links: Omit<INavLink, "url">[] }

export type ISideNav = {
  isOpen: boolean
  onDismiss: () => void
}
export const SideNav: React.FC<ISideNav> = ({ isOpen, onDismiss }) => {
  const { push } = useHistory()

  const navLinkGroups: IReactRouterNavLinkGroup[] = useMemo(
    () => [
      {
        links: [
          {
            key: "scraps",
            name: "Scraps",
            icon: "TextDocument",
            onClick: () => push("/"),
          },
        ],
      },
    ],
    []
  )

  return (
    <Panel
      onRenderHeader={() => <NavBrand />}
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.smallFixedNear}
      closeButtonAriaLabel="Close"
      isLightDismiss={true}
      styles={{
        commands: { marginTop: "0.5rem", marginBottom: "0.5rem" },
        navigation: { justifyContent: "space-between", alignItems: "center" },
        content: { padding: 0 },
      }}
    >
      <Nav groups={navLinkGroups as INavLinkGroup[]} selectedKey={"scraps"} />
    </Panel>
  )
}
