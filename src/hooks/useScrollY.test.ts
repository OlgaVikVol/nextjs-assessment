import { renderHook, act } from '@testing-library/react';
import { useScrollY } from './useScrollY';

describe('useScrollY', () => {
  it('should return initial scrollY value as 0', () => {
    const { result } = renderHook(() => useScrollY());
    expect(result.current).toBe(0);
  });

  it('should update scrollY when window scrolls', () => {
    const { result } = renderHook(() => useScrollY());

    // Simulate scrolling
    act(() => {
      window.scrollY = 100; // Simulate scrolling to 100px
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(100);
  });

  it('should clean up event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useScrollY());

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
