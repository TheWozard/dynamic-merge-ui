import { URL } from "url"
import axios, { AxiosInstance } from "axios"

// A Generic block of data, With no expectation of its form yet.
export interface DocumentSource {
    readonly name: string
    get(): Promise<any>
}

// Basic Memory based document source for unit testing and local development.
// Added functionality to include a delay in resolution to simulate delay.
export class MemoryDocumentSource implements DocumentSource {
    public readonly name: string
    private data: any
    private delayMS: number

    constructor(name: string, data: any, delayMS: number = 0) {
        this.name = name
        this.data = data
        this.delayMS = delayMS
    }

    public async get() {
        if (this.delayMS > 0) {
            await new Promise(resolve => setTimeout(resolve, this.delayMS))
        }
        return this.data
    }
}

// HTTP based document source. Ultimately a wrapper on Axios.
// Includes function extract in constructor for resolving to custom parts of the response body.
export class HTTPDocumentSource implements DocumentSource {
    public readonly name: string
    private url: string
    private client: AxiosInstance
    private extract?: (body: any) => any

    constructor(url: string, extract?: (body: any) => any, client = axios.create({
        timeout: 1000,
    })) {
        this.name = new URL(url).hostname
        this.url = url
        this.client = client
        // extract gives a way to pull a section from the response data.
        // This is ultimately a leaky implementation but will exist for flexibility.
        this.extract = extract
    }

    public async get() {
        const response = await this.client.get(this.url)
        if (this.extract != null) {
            return this.extract(response.data)
        } else {
            return response.data
        }
    }
}