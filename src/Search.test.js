import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../src/components/Search/Search"

describe("Search", () => {
  test("renders search input with given placeholder", () => {
    const { getByPlaceholderText } = render(
      <Search placeholder="Search for something..." />
    );
    expect(getByPlaceholderText("Search for something...")).toBeInTheDocument();
  });

test("sets input value correctly", async () => {
  const { getByPlaceholderText } = render(
    <Search placeholder="Search for something..." />
  );
  const input = getByPlaceholderText("Search for something...");
  fireEvent.change(input, { target: { value: "test value" } });
  await waitFor(() => expect(input.value).toBe("test value"));
});


//   test("clears input value on clear button click", () => {
//     const { getByPlaceholderText, getByText } = render(
//       <Search placeholder="Search for something" />
//     );
//     const input = getByPlaceholderText("Search for something");
//     const clearButton = getByText("x");
//     fireEvent.change(input, { target: { value: "test value" } });
//     fireEvent.click(clearButton);
//     expect(input.value).toBe("test value");
//   });

  test("calls searchClick function on search button click", () => {
    const searchClickMock = jest.fn();
    const { getByText } = render(<Search searchClick={searchClickMock} />);
    const searchButton = getByText("Search");
    fireEvent.click(searchButton);
    expect(searchClickMock).toHaveBeenCalled();
  });
});
