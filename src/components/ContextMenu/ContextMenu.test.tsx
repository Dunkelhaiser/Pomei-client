import { render, fireEvent } from "@testing-library/react";
import { vitest } from "vitest";
import ContextMenu from "./ContextMenu";

describe("ContextMenu", () => {
    const options = [
        { label: "Option 1", onClick: vitest.fn() },
        { label: "Option 2", onClick: vitest.fn() },
        { label: "Option 3", onClick: vitest.fn() },
    ];
    const outsideClick = vitest.fn();

    it("renders correctly", () => {
        const { container } = render(<ContextMenu classRef="test" options={options} outsideClick={outsideClick} />);
        const contextMenu = container.querySelector(".test");
        expect(contextMenu).toBeInTheDocument();
        expect(contextMenu?.querySelectorAll("li")).toHaveLength(3);
    });

    it("calls the correct callback when an option is clicked", () => {
        const { container } = render(<ContextMenu classRef="test" options={options} outsideClick={outsideClick} />);
        const option = container.querySelector("li span");
        if (option) fireEvent.click(option);
        expect(options[0].onClick).toHaveBeenCalledTimes(1);
    });

    it("calls the outsideClick callback when clicking outside the menu", () => {
        render(<ContextMenu classRef="test" options={options} outsideClick={outsideClick} />);
        fireEvent.mouseDown(document);
        expect(outsideClick).toHaveBeenCalledTimes(1);
    });
});
