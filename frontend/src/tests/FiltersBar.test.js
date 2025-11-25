import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "./test-utils";
import { FiltersBar } from "../components/FiltersBar";

test("llama onChangeSearch al escribir en el input", () => {
  const mockSearch = jest.fn();

  render(
    <FiltersBar
      files={[]}
      loadingFiles={false}
      selectedFile=""
      onChangeFile={() => {}}
      search=""
      onChangeSearch={mockSearch}
    />
  );

  const input = screen.getByPlaceholderText(/search text/i);
  fireEvent.change(input, { target: { value: "abc" } });

  expect(mockSearch).toHaveBeenCalledWith("abc");
});
