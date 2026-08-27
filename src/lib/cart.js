const KEY = 'arp-cart'

function read() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

function write(items) {
  window.localStorage.setItem(KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent('cart-updated'))
}

export function getCart() {
  return read()
}

export function addToCart(item) {
  const items = read()
  const existing = items.find((i) => i.slug === item.slug && i.circulation === item.circulation && i.packaging === item.packaging)
  if (existing) {
    existing.qty += item.qty
  } else {
    items.push(item)
  }
  write(items)
}

export function updateQty(index, qty) {
  const items = read()
  if (!items[index]) return
  items[index].qty = Math.max(1, qty)
  write(items)
}

export function removeFromCart(index) {
  const items = read()
  items.splice(index, 1)
  write(items)
}

export function clearCart() {
  write([])
}

export function subtotal(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0)
}
