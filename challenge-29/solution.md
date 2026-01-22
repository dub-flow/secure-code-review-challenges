# How to Hack

The app in this challenge is vulnerable to Mass Assignment. It is a basic payment app that allows users to manage and pay invoices, where the payment status is intended to be set only by the payment processing endpoint: `/pay`

However, instead of paying for an invoice via `/pay`, a user can simply add `"paid": true` to the `POST /invoices` request (see `./exploit.req`). This creates the invoice and marks it as paid immediately.

# How to Fix

To remediate the vulnerability, we change the `POST /invoices` endpoint to explicitly set `paid=False` (see `./safe.py`).