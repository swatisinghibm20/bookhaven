// Pure helpers for updating the cart array held in App state.
// Usage: setCart((prev) => addItem(prev, book))

export const addItem = (cart, book) =>
  cart.some((i) => i.id === book.id)
    ? cart.map((i) => (i.id === book.id ? { ...i, qty: i.qty + 1 } : i))
    : [...cart, { ...book, qty: 1 }];

// Dropping a quantity to 0 removes the item.
export const changeQty = (cart, id, delta) =>
  cart.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0);

export const qtyOf = (cart, id) => cart.find((i) => i.id === id)?.qty ?? 0;
