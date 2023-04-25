import { render, fireEvent } from "@testing-library/react";
import { vitest } from "vitest";
import Button from "./Button";

describe("Button", () => {
    const onClick = vitest.fn();

    it("renders correctly with default props", () => {
        const { getByText } = render(<Button label="Click me" onClick={onClick} />);
        const button = getByText("Click me");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("button primary normal");
        expect(button).toHaveStyle("font-size: 1.2rem");
    });

    it("renders correctly with specified props", () => {
        const { getByText } = render(
            <Button label="Delete" color="danger" fontSize={1.5} styleType="outline" icon={<span>X</span>} onClick={onClick} />
        );
        const button = getByText("Delete");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("button danger outline");
        expect(button).toHaveStyle("font-size: 1.5rem");
    });

    it("calls onClick when clicked", () => {
        const { getByText } = render(<Button label="Click me" onClick={onClick} />);
        const button = getByText("Click me");
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
