import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders ExamPool heading", () => {
    render(<App />);
    expect(screen.getByText("문제다모아")).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    render(<App />);
    expect(screen.getByText("문제 은행")).toBeInTheDocument();
    expect(screen.getByText("시험 생성")).toBeInTheDocument();
    expect(screen.getByText("결과 분석")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<App />);
    expect(screen.getByText("통계")).toBeInTheDocument();
  });
});
