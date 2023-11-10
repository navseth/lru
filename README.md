# Generic LRU Cache

This repository contains my implementation of a LRU Cache.

# Implementation Approach

The time complexity of my implementation is being done in O(1) time (ie: constant). I am using a "Map" to keep track of items that are added to the cache. By using a map I can easily identify if an item is in my cache by doing a map lookup. This operation is done in constant time. In order to determine the Least Recently Used and Most Recently Used items I can use a Double Linked List. The Head of the linked list will always represent the Most Recently Used item, and to do that I make sure that it's updated with the item that was either last accessed or the last item that was added to the cache.

It is important to note that the LRU Cache has a capacity limit. Whenever we reach capacity, we must evict the "Least Recently Used" item. This requirement is known as our eviction policy for our cache. To evict the LRU, we simply remove the "tail" of the Linked List and remove that item from the map as well.

# Typescript

To make my implementation a bit more flexible and extensible by using Typescript Generics. The value `T` represents the type of data you want to store in the cache. An example on how you can create the LRUCache for a certain type you can do the following:

```@javascript
import { LRUCache } from '..';
// The parameter in the constructor represents the capacity of the cache.
const myObjectLRUCache = new LRUCache<{id: number; firstName: string;}>(3);
```

# Unit Testing

To ensure completeness with my implementation, I have also added unit tests. These tests were written with Jest and can be found in the `__tests__`.
