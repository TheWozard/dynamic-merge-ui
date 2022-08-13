import { ResizeSensor } from "@blueprintjs/core";
import Editor, { Monaco } from "@monaco-editor/react";
import React from "react";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

interface Props {
    parse: (raw: string) => any
    stringify: (data: any) => string

    data: DataInstance
    onChange?: (data: any) => void
    onValidate?: (success: boolean) => void
}

interface MonacoVars {
    monacoEditor?: monaco.editor.IStandaloneCodeEditor
    monaco?: Monaco
}

export class DataInstance {
    public data: any
    constructor(data: any) {
        this.data = data
    }
}

// CodeError extends a standard error by allowing it to have a location in the code
export class CodeError extends Error {
    public line: number
    public column: number
    public message: string
    constructor(line: number, column: number, message: string) {
        super(message)
        this.line = line
        this.column = column
        this.message = message
    }
}

export const CodeEditor: React.FunctionComponent<Props> = ({ parse, stringify, data, onChange, onValidate }) => {
    const [code, setCode] = React.useState<string>("")
    const [height, setHeight] = React.useState<number>(300)
    const [errors, setErrors] = React.useState<CodeError[]>([])
    const [, setDecorations] = React.useState<string[]>([])
    const [vars, setVars] = React.useState<MonacoVars>({})
    const [valid, setValid] = React.useState<boolean>(true)

    const { monacoEditor, monaco } = vars

    React.useEffect(() => {
        if (onValidate != null) {
            onValidate(valid)
        }
    }, [valid, onValidate])

    // Update the current code anytime data is change. This will overwrite the current state so
    // could easily produce unexpected results.
    React.useEffect(() => {
        setCode(stringify(data.data))
        setErrors([])
        setValid(true)
    }, [data, stringify])

    // Update Monaco Decorations whenever the errors change
    React.useEffect(() => {
        if (!monacoEditor || !monaco) {
            return
        }
        setDecorations(decorations => monacoEditor.deltaDecorations(
            decorations,
            errors.map((err) => {
                const lineLength = monacoEditor.getModel()?.getLineContent(err.line).length || 1
                return (
                    {
                        range: new monaco.Range(err.line, err.column, err.line, err.column + lineLength),
                        options: {
                            inlineClassName: "error-line",
                            after: {
                                content: `  ${err.message}`,
                                inlineClassName: "light-text"
                            }
                        }
                    }
                )
            })
        ));
    }, [monacoEditor, monaco, errors]);

    // Handler for converting string data to usable data
    function handleChange(value?: string) {
        if (value != null) {
            try {
                setCode(value)
                if (onChange != null) {
                    onChange(parse(value))
                }
                setErrors([])
                setValid(true)
            } catch (e: any) {
                if (e instanceof CodeError) {
                    setErrors([e])
                } else {
                    console.error(e)
                }
                setValid(false)
            }
        }
    }

    // Handles getting references to the editor
    async function handleMount(monacoEditor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) {
        setVars({ monacoEditor, monaco });
    }

    return (
        <ResizeSensor onResize={(entries) => {
            entries.forEach(e => {
                if (e.contentRect.height > 50) {
                    setHeight(e.contentRect.height)
                }
            });
        }}>
            <div className="resize-vertical popup-container" style={{ minHeight: 100 }}>
                <Editor
                    height={`${height}px`}
                    language="yaml"
                    value={code}
                    theme="vs-dark"
                    onChange={handleChange}
                    onMount={handleMount}
                />
            </div>
        </ResizeSensor>
    )
}
