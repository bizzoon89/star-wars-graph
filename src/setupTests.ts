// src/setupTests.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// ---- Mock browser-only APIs (jsdom doesn't have them) ----
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).IntersectionObserver = MockIntersectionObserver;
(global as any).ResizeObserver = MockResizeObserver;

// ---- Mock global fetch so no real API requests are made ----
beforeAll(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.resetAllMocks();
});
