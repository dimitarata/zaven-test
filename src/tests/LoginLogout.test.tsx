import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Dashboard from "../containers/Dashboard/Dashboard";
import LoginForm from "../containers/Login/LoginForm/LoginForm";
import Router from "./TestingRouter";

describe("Login/Logout Tests", () => {
  test("login", async () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <LoginForm handleLogin={mockFn} errorMessage="" />
    );

    const button = getByTestId("button");

    const username = getByTestId("username");

    const password = getByTestId("password");

    expect(password).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.change(username, { target: { value: "admin" } });
    fireEvent.change(password, { target: { value: "password" } });
    userEvent.click(button);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith({
        username: "admin",
        password: "password",
      });
    });
  });

  test("logout", async () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <LoginForm handleLogin={mockFn} errorMessage="" />
    );

    const button = getByTestId("button");

    const username = getByTestId("username");

    const password = getByTestId("password");

    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(username, { target: { value: "admin" } });
    userEvent.click(button);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith({
        username: "admin",
        password: "password",
      });
    });

    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "token=random-token",
    });

    const dashboard = render(
      <Router
        RedirectedComponent={() => <Dashboard />}
        redirectionUrl="/dashboard"
      />
    );

    const logoutButton = dashboard.getByTestId("logout-button");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
  });
});
