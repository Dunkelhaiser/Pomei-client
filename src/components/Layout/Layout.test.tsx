import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Sidebar", () => {
    it("should render the sidebar", () => {
        render(
            <Layout title="Heading">
                <h2>Hello</h2>
            </Layout>
        );
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Heading");
    });
});
