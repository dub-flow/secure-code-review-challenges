# Task

Find the vulnerability in the code.

## Scenario assumptions

- Proper authentication and authorization are in place
- Users can generate invoices by submitting billing details:
  - customer_name
  - billing_address
  - vat_id
  - description
- The invoice amount is determined server-side based on the authenticated user's subscription plan/contract
  (assume it is fetched from the database via `get_amount_for_current_user()`)
- The client does not provide the amount
- Payment status (`paid`) is intended to be set only by the payment endpoint:
  - POST /pay/<invoice_id>
- Assume the payment logic is correct and sets `paid=true` only after a successful payment
