import LRUCache from "../lru-cache";

describe("LRU Cache Implementation Tests", () => {
  it("should never exceed the caches capacity", () => {
    const cache = new LRUCache<string>(1);
    expect(cache.size).toBe(0);
  });
});
