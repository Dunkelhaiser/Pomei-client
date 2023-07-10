// /* eslint-disable react/jsx-props-no-spreading */
// import { render, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import Card from "./Card";

// describe("Card component", () => {
//     const defaultProps = {
//         title: "Test title",
//         content: "Test content",
//         date: "2022-05-01",
//     };

//     test("renders with default props", () => {
//         const { getByRole, getByText } = render(
//             <MemoryRouter>
//                 <Card id="1" {...defaultProps} />
//             </MemoryRouter>
//         );

//         expect(getByRole("button")).toBeInTheDocument();
//         expect(getByText("Test title")).toBeInTheDocument();
//         expect(getByText("Test content")).toBeInTheDocument();
//         expect(getByText("2022-05-01")).toBeInTheDocument();
//     });

//     test("truncates content with textLimit prop", () => {
//         const { getByText } = render(
//             <MemoryRouter>
//                 <Card id="1" {...defaultProps} textLimit={10} />
//             </MemoryRouter>
//         );

//         expect(getByText("Test conte...")).toBeInTheDocument();
//     });

//     test("shows context menu when options button is clicked", () => {
//         const { getByRole } = render(
//             <MemoryRouter>
//                 <Card id="1" {...defaultProps} />
//             </MemoryRouter>
//         );

//         const optionsButton = getByRole("button");
//         fireEvent.click(optionsButton);
//     });
// });
