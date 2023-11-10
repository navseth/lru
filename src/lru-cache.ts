class DoubleLinkedListNode<T> {
  key;
  value;
  next;
  prev;

  constructor(
    key: string,
    value: T,
    next: DoubleLinkedListNode<T> | null = null,
    prev: DoubleLinkedListNode<T> | null = null
  ) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

export default class LRUCache<T> {
  size: number;
  capacity: number;
  cache: { [key: string]: DoubleLinkedListNode<T> };
  head: DoubleLinkedListNode<T> | null;
  tail: DoubleLinkedListNode<T> | null;

  constructor(capacity: number) {
    this.size = 0;
    this.capacity = capacity;
    this.cache = {};
    this.head = null;
    this.tail = null;
  }

  /*
        If the item is not in the cache, return -1. 
        If the item is in the cache, call "set" again on it, 
        so that we can update the Least Recently Used (LRU) item. 
        Then return the value.     
    */
  get(key: string) {
    const existingNode = this.cache[key];
    if (existingNode) {
      const value = existingNode.value;
      if (this.head !== existingNode) {
        this.set(key, value);
      }
    }
    return -1;
  }

  /* 
       Algorithm:

       1. If the key is not in the list then add it next to the head (if not yet at capacity).
       2. If Key is in the list then remove it and add it next to the head in order to classify it as the 
          Most Recently Used.
       3. If key is not in the list but we are at capacity then we need to remove the Least Recently Used (LRU)
          (ie: tail) and then add the new key/value to the front of the list because it now becomes the Most
          Recently Used (MRU).  s
    */
  set(key: string, value: T) {
    const existingNode = this.cache[key];
    const isAtCapacity = this.size === this.capacity;

    // If the node already exists in the list, we need to remove it
    // and move it to the front of the list. We can ensure we are still
    // within capacity because we are just going to re-add the same key/value
    // and so the size should remain the same upon completion.
    if (existingNode) {
      this.removeNode(existingNode);
      this.size--;
    }
    // The node doesn't exist and we are at capacity. Let's remove the tail.
    // Let's also remove it from the cache
    else if (isAtCapacity && this.tail != null) {
      this.removeNode(this.tail);
      delete this.cache[this.tail.key];
      this.size--;
    }

    // At this point we have made sure that we can add something to the
    // Double Linked List. We want to add a new node to the head of the
    // Double Linked List.

    // The list is empty so we are adding the first item.
    if (!this.head) {
      this.head = this.tail = new DoubleLinkedListNode(key, value);
    } else {
      const newNode = new DoubleLinkedListNode(key, value, this.head);
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.cache[key] = this.head;
    this.size++;
  }

  // Helper method to remove a node from the double linked list.
  removeNode(node: DoubleLinkedListNode<T>) {
    if (node.prev !== null && node.next) {
      node.next.prev == node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null && node.prev) {
      node.prev.next = node.prev;
    } else {
      this.tail = node.prev;
    }
  }
}
