import { render, screen, fireEvent } from "@testing-library/react";
import { Username } from "./Username";
import * as UsernameManager from "../utils/UsernameManager";

// Mock the UsernameManager module
jest.mock("../utils/UsernameManager", () => ({
  GetUsername: jest.fn(),
  StoreUsername: jest.fn(),
  ValidateUsername: jest.fn(),
}));

describe("Username component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders username input field", () => {
    render(<Username />);
    expect(screen.getByPlaceholderText("LeeroyJenkins#1234")).toBeDefined();
  });
});
