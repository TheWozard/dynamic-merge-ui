import { IconName } from "@blueprintjs/core"
import { Button, Card, Intent } from "@blueprintjs/core"
import React from "react"

interface CollapsibleCardProps {
    title: string
    open?: boolean
    menu?: React.FunctionComponent
    intent?: Intent
    icon?: IconName
}

export const CollapsibleCard: React.FunctionComponent<React.PropsWithChildren<CollapsibleCardProps>> = ({ children, title, open, menu, intent, icon }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(open || false)
    const MENU = menu
    return (
        <Card className={"margin-vertical-spacing thin-padding"} onClick={() => setIsOpen(!isOpen)}>
            <div className={"margin-horizontal-spacing inline-list"}>
                <Button
                    fill minimal
                    text={title}
                    alignText={"left"}
                    onClick={() => setIsOpen(!isOpen)}
                    intent={intent}
                    icon={icon || (isOpen ? "chevron-down" : "chevron-right")}
                />
                <ClickBlocker>
                    {MENU != null && <MENU />}
                </ClickBlocker>
            </div>
            <div hidden={!isOpen}>
                <ClickBlocker>{children}</ClickBlocker>
            </div>
        </Card>
    )
}

const ClickBlocker: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div onClick={(event) => {
            event.stopPropagation()
        }}>
            {children}
        </div>
    )
}