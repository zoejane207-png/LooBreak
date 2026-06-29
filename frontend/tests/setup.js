// jsdom in this environment does not provide a localStorage implementation,
// which causes any component/hook using it (e.g. useDarkMode) to crash in tests.
// Provide a minimal in-memory polyfill so tests render real pages.
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key)
      ? this.store[key]
      : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

if (typeof globalThis.localStorage === "undefined") {
  globalThis.localStorage = new LocalStorageMock();
}
