import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UsernameForm } from "./UsernameForm";
import * as UsernameManager from "../utils/UsernameManager";

// Mock the UsernameManager module
jest.mock("../utils/UsernameManager", () => ({
  GetUsername: jest.fn(),
  StoreUsername: jest.fn(),
  ValidateUsername: jest.fn(),
}));

const validUsername = "LeeroyJenkins#1234";
const usernameTestCases = [
  { username: validUsername, isValid: true },
  { username: "valid username#1234", isValid: true },
  { username: "[]#{symbols#1234", isValid: true },
  { username: "_another_name_#1234", isValid: true },
  { username: "VeryLongUsernameExceeding20Chars#1234", isValid: true },
  // invalid usernames
  { username: "InvalidUsername", isValid: false },
  { username: "Invalid#123", isValid: false },
  { username: "Invalid#12345", isValid: false },
];

describe("UsernameForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders username input field", () => {
    render(<UsernameForm onUsernameSubmitted={() => {}} />);
    expect(screen.getByPlaceholderText("LeeroyJenkins#1234")).toBeDefined();
  });

  test.each(usernameTestCases)("verifies submit button state for %s", ({ username, isValid }) => {
    (UsernameManager.ValidateUsername as jest.Mock).mockReturnValue(isValid);

    render(<UsernameForm onUsernameSubmitted={() => {}} />);
    const input = screen.getByTestId("username-input");
    fireEvent.change(input, { target: { value: username } });

    // Check if the button is enabled/disabled according to validity
    const saveButton = screen.getByRole("button", { name: "Save" });
    if (isValid) {
      expect(saveButton).toBeEnabled();
    } else {
      expect(saveButton).toBeDisabled();
    }
  });

  test("calls onUsernameSubmitted with valid username", () => {
    const mockOnSubmit = jest.fn();
    (UsernameManager.ValidateUsername as jest.Mock).mockReturnValue(true);

    render(<UsernameForm onUsernameSubmitted={mockOnSubmit} />);
    const input = screen.getByTestId("username-input");
    fireEvent.change(input, { target: { value: validUsername } });

    const form = screen.getByRole("username-form");
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalledWith(validUsername);
  });
});
