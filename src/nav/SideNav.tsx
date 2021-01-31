import React, { useMemo } from "react"
import { INavLink, INavLinkGroup, Nav } from "@fluentui/react"
import { SideNavPanel } from "./components/SideNavPanel"
import { useHistory } from "react-router-dom"
import { NavBrand } from "./components/NavBrand"

type IReactRouterNavLinkGroup = Omit<INavLinkGroup, "links"> & { links: Omit<INavLink, "url">[] }

export type ISideNav = {}
export const SideNav: React.FC<ISideNav> = ({}) => {
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
    <SideNavPanel>
      <NavBrand />
      <Nav groups={navLinkGroups as INavLinkGroup[]} selectedKey={"scraps"} />
    </SideNavPanel>
  )
}
