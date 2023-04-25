import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
    it("renders without crashing", () => {
        render(<Layout>Hello, World!</Layout>);
    });
    it("renders children", () => {
        render(<Layout>Hello, World!</Layout>);
        expect(screen.getByText("Hello, World!")).toBeInTheDocument();
    });
    it("displays the title", () => {
        render(<Layout title="My Title">Hello, World!</Layout>);
        expect(screen.getByText("My Title")).toHaveTextContent(/My title/i);
    });
    it("displays the controls", () => {
        const controls = <button>Clock</button>;
        render(<Layout controls={controls}>Hello, World!</Layout>);
        expect(screen.getByText("Clock")).toBeInTheDocument();
    });
    it("applies the className", () => {
        const { container } = render(<Layout className="my-class">Hello, World!</Layout>);
        expect(container.lastChild).toHaveClass("my-class");
    });
});
