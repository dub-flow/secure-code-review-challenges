const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// Imagine this to be a fully-grown database. For this lab, ignore authentication and authorization.
const products = new Map([
  ["p1", { priceCents: 1500 }],
  ["p2", { priceCents: 3000 }],
]);

const coupons = new Map([
  ["PROMO10", { percentOff: 10, active: true }],
]);

const carts = new Map();

const subtotal = (cart) =>
  cart.items.reduce(
    (t, i) => t + (products.get(i.productId)?.priceCents || 0) * i.qty,
    0
  );

app.get("/cart/:id", (req, res) => {
  const cart = carts.get(req.params.id);
  if (!cart) return res.sendStatus(404);

  const subtotalCents = subtotal(cart);
  const totalCents = Math.max(0, subtotalCents - cart.discountCents);

  res.json({
    cartId: cart.id,
    subtotalCents,
    discountCents: cart.discountCents,
    totalCents,
  });
});

app.post("/cart", (_, res) => {
  const cart = { id: crypto.randomUUID(), items: [], discountCents: 0 };
  carts.set(cart.id, cart);
  res.json(cart);
});

app.post("/cart/:id/item", (req, res) => {
  const cart = carts.get(req.params.id);
  if (!cart) return res.sendStatus(404);

  const { productId, qty } = req.body;
  if (!products.has(productId) || qty <= 0) return res.sendStatus(400);

  cart.items.push({ productId, qty });
  res.json(cart);
});

app.post("/cart/:id/apply-coupon", (req, res) => {
  const cart = carts.get(req.params.id);
  const coupon = coupons.get(String(req.body.code).toUpperCase());
  if (!cart || !coupon?.active) return res.sendStatus(400);

  cart.discountCents += Math.floor(subtotal(cart) * coupon.percentOff / 100);

  res.json({ message: "Coupon applied" });
});

app.listen(3000);
