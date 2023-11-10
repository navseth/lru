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

  it("should always evict the LRU when it has reached capacity", () => {
    const cache = new LRUCache<string>(2);
    cache.set("firstDrink", "Buble");
    cache.set("secondDrink", "Pepsi");
    cache.set("thirdDrink", "Chai Tea");
    expect(cache.get("firstDrink")).toBe(-1);
  });

  it("should update the LRU when its been used again and not evict it", () => {
    const cache = new LRUCache<string>(2);
    cache.set("firstDrink", "Buble");
    cache.set("secondDrink", "Pepsi");
    expect(cache.getMostRecentlyUsed()).toBe("Pepsi");
    cache.set("firstDrink", "Buble");
    expect(cache.getMostRecentlyUsed()).toBe("Buble");

    cache.set("thirdDrink", "Almond Milk");

    expect(cache.get("secondDrink")).toBe(-1);
  });

  it("should update the Most Recently Used item when an existing item has been added to the cache more than once", () => {
    const cache = new LRUCache<string>(2);
    cache.set("firstDrink", "Buble");
    cache.set("secondDrink", "Pepsi");
    expect(cache.getMostRecentlyUsed()).toBe("Pepsi");
    cache.set("firstDrink", "Buble");
    expect(cache.getMostRecentlyUsed()).toBe("Buble");
    cache.set("thirdDrink", "Almond Milk");
    expect(cache.getMostRecentlyUsed()).toBe("Almond Milk");
  });

  it("should update the Most Recently Used to be the item that was last retrieved", () => {
    const cache = new LRUCache<string>(2);
    cache.set("firstDrink", "Buble");
    cache.set("secondDrink", "Pepsi");
    cache.get("firstDrink");
    expect(cache.getMostRecentlyUsed()).toBe("Buble");
  });

  it("should update the Least Recently Used to be the item that was last accessed after something was retrieved", () => {
    const cache = new LRUCache<string>(2);
    cache.set("firstDrink", "Buble");
    cache.set("secondDrink", "Pepsi");
    cache.get("firstDrink");
    expect(cache.getLeastRecentlyUsed()).toBe("Pepsi");
  });

  it("should update the Least Recently Used after a new item was added and/or evicted from the cache", () => {
    const cache = new LRUCache<string>(2);
    cache.set("firstDrink", "Buble");
    cache.set("secondDrink", "Pepsi");
    expect(cache.getLeastRecentlyUsed()).toBe("Buble");
    cache.set("thirdDrink", "Almond Milk");
    expect(cache.getLeastRecentlyUsed()).toBe("Pepsi");
    cache.get("secondDrink");
    expect(cache.getLeastRecentlyUsed()).toBe("Almond Milk");
  });
});
