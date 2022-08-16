import { MemoryDocumentSource } from "document/source";
import { Traversal } from "document/traversal";

describe("traversal", () => {
    const positive_construction_cases: { name: string, input: any }[] = [
        { name: "basic", input: {} },
    ]
    it.each(positive_construction_cases)("FromSource positive", async ({ name, input }) => {
        await expect(Traversal.FromSource(new MemoryDocumentSource(name, input))).resolves.not.toThrow()
    })

    const negative_construction_cases: { name: string, input: any }[] = [
        { name: "bad", input: "" },
    ]
    it.each(negative_construction_cases)("FromSource negative", async ({ name, input }) => {
        await expect(Traversal.FromSource(new MemoryDocumentSource(name, input))).rejects.toThrowError("Invalid Traversal")
    })

    it("reload calls source again", async () => {
        const source = new MemoryDocumentSource("test", {})
        const spy = jest.spyOn(source, "get")
        const example = await Traversal.FromSource(source)
        expect(spy.mock.calls.length).toEqual(1)
        await example.reload()
        expect(spy.mock.calls.length).toEqual(2)
    })
})