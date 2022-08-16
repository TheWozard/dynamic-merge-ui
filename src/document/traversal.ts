import { DocumentSource } from "document/source";
import Ajv from "ajv"

const ajv = new Ajv()

const schema = ajv.compile({
    type: "object",
})

export class Traversal {
    public source: DocumentSource
    private data: any

    public static async FromSource(source: DocumentSource) {
        const data = await source.get()
        if (!schema(data)) {
            throw new Error("Invalid Traversal")
        }
        return new Traversal(data, source)
    }

    constructor(data: any, source: DocumentSource) {
        this.source = source
        this.data = data
    }

    // Returns a new Traversal from the same source
    public async reload() {
        return await Traversal.FromSource(this.source)
    }
}