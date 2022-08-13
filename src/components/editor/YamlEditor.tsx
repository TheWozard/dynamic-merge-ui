import React from "react";
import { CodeEditor, CodeError } from "components/editor/CodeEditor";
import YAML, { YAMLParseError } from 'yaml'

interface Props {
    data: any
    onChange?: (data: any) => void
    onValidate?: (success: boolean) => void
}

export const YamlEditor: React.FunctionComponent<Props> = (props) => (
    <CodeEditor
        {...props}
        parse={(code: string) => {
            try {
                return YAML.parse(code)
            } catch (e) {
                if (e instanceof YAMLParseError) {
                    throw new CodeError(e.linePos?.[0].line || 1, e.linePos?.[0].col || 1, e.message.slice(0, e.message.indexOf(":")))
                } else {
                    throw e
                }
            }
        }}
        stringify={YAML.stringify}
    />
)
