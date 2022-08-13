import { Button, Divider, IconName, Intent, Menu } from "@blueprintjs/core";
import { Popover2, MenuItem2 } from "@blueprintjs/popover2";
import { CollapsibleCard } from "components/CollapsibleCard";
import { DataInstance } from "components/editor/CodeEditor";
import { YamlEditor } from "components/editor/YamlEditor";
import React from "react";

interface DocumentProps {
    traversal?: boolean
    linked?: boolean
}


export const Document: React.FunctionComponent<DocumentProps> = ({ traversal, linked }) => {
    const [valid, setValid] = React.useState<boolean>(true)
    const [data, setData] = React.useState<any>(new DataInstance({ "some": "data" }))

    const intent: Intent = !valid ? "danger" : traversal ? "primary" : "none"
    const icon: IconName = !valid ? "error" : traversal ? "route" : linked ? "link" : "document"

    const DocumentMenu = () => {
        const [isOpen, setIsOpen] = React.useState<boolean>(false)
        return (
            <Popover2
                interactionKind="click"
                placement="bottom-end"
                content={
                    <Menu>
                        <MenuItem2 icon="refresh" text="Reload Data" onClick={() => {
                            setData(new DataInstance(data.data))
                        }} />
                        <Divider />
                    </Menu>
                }
                isOpen={isOpen}
                onInteraction={setIsOpen}
            >
                <Button
                    minimal
                    icon={"menu"}
                    active={isOpen}
                    onClick={() => { setIsOpen(!isOpen) }}
                />
            </Popover2>
        )
    }

    return (
        <CollapsibleCard title={"Example"} menu={DocumentMenu} intent={intent} icon={icon} >
            <YamlEditor data={data} onChange={(data) => data.data = data} onValidate={setValid} />
        </CollapsibleCard>
    )
}