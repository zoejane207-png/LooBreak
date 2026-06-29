import useDarkMode from "../../../src/utils/useDarkMode";
import { renderHook, act } from "@testing-library/react";

describe("useDarkMode", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("starts in lightmode by default", () => {
    const { result } = renderHook(() => useDarkMode());
    const [isDark] = result.current;
    expect(isDark).toBe(false);
  });

  test("toggles isDark state", () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => {
      const [, setIsDark] = result.current;
      setIsDark(true);
    });
    const [isDark] = result.current;
    expect(isDark).toBe(true);
  });
});
