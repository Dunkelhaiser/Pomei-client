import { renderHook, act } from "@testing-library/react";
import useToggle from "./useToggle";

describe("useToggle", () => {
    it("returns initial value correctly", () => {
        const { result } = renderHook(() => useToggle(true));
        expect(result.current[0]).toBe(true);
    });

    it("toggles the state when called with no arguments", () => {
        const { result } = renderHook(() => useToggle(true));
        act(() => {
            result.current[1]();
        });
        expect(result.current[0]).toBe(false);
        act(() => {
            result.current[1]();
        });
        expect(result.current[0]).toBe(true);
    });

    it("sets the state to the new value when called with an argument", () => {
        const { result } = renderHook(() => useToggle(true));
        act(() => {
            result.current[1](false);
        });
        expect(result.current[0]).toBe(false);
        act(() => {
            result.current[1](true);
        });
        expect(result.current[0]).toBe(true);
    });
});
