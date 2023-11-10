import LRUCache from "../lru-cache";

describe("LRU Cache Implementation Tests", () => {
  it("should never exceed the caches capacity", () => {
    const cache = new LRUCache<string>(1);
    expect(cache.size).toBe(0);
    cache.set("firstDrink", "Buble");
    expect(cache.size).toBe(1);
    cache.set("secondDrink", "Pepsi");
    expect(cache.size).toBe(1);
  });
});
