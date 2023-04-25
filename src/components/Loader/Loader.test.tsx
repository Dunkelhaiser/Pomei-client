import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
    it("renders correctly", () => {
        const { container } = render(<Loader />);
        const loader = container.querySelector(".loader");
        expect(loader).toBeInTheDocument();
        expect(loader?.childElementCount).toBe(8);
    });
});
