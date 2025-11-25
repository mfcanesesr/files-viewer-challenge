import '@testing-library/jest-dom';
import { render, screen } from "./test-utils";
import { FilesTable } from "../components/FilesTable";

test("muestra 'No data found' cuando rows viene vacío y loading=false", () => {
  render(<FilesTable rows={[]} loading={false} />);
  expect(screen.getByText(/No data found/i)).toBeInTheDocument();
});
