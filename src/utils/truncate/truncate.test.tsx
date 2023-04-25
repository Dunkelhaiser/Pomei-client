import { truncate } from "./truncate";

describe("truncate", () => {
    it("returns the original text if it is shorter than the length argument", () => {
        const text = "hello";
        const result = truncate(text, 10);
        expect(result).toBe(text);
    });

    it("returns the original text if length argument is less than one", () => {
        const text = "hello";
        const result = truncate(text, -1);
        expect(result).toBe(text);
    });

    it("truncates the text correctly if it is longer than the length argument", () => {
        const text = "hello world";
        const result = truncate(text, 5);
        expect(result).toBe("hello...");
    });

    it("returns an empty string if the input is an empty string", () => {
        const text = "";
        const result = truncate(text, 10);
        expect(result).toBe("");
    });
});
