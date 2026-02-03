from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
db_path = os.path.join(os.path.dirname(__file__), "invoices.db")
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(128))
    billing_address = db.Column(db.String(255))
    vat_id = db.Column(db.String(64))
    description = db.Column(db.String(255))
    amount = db.Column(db.Float, nullable=False)
    paid = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "billing_address": self.billing_address,
            "vat_id": self.vat_id,
            "amount": self.amount,
            "description": self.description,
            "paid": self.paid
        }

@app.route("/")
def index():
    return render_template("index.html")

def get_amount_for_current_user():
    # Assume this fetches the authenticated user's plan/contract amount from the database
    return 99.0

@app.route("/invoices", methods=["POST"])
def create_invoice():
    data = request.json or {}

    # Amount is server-controlled (e.g., from the authenticated user's plan/contract)
    data["amount"] = get_amount_for_current_user()
    invoice = Invoice(**data)

    db.session.add(invoice)
    db.session.commit()
    return jsonify(invoice.to_dict()), 201

@app.route("/invoices", methods=["GET"])
def list_invoices():
    invoices = Invoice.query.all()
    return jsonify([i.to_dict() for i in invoices])

@app.route("/pay/<int:invoice_id>", methods=["POST"])
def mark_invoice_paid(invoice_id):
    invoice = Invoice.query.get_or_404(invoice_id)

    # Imagine some proper payment logic here that allows you paying the invoice and, if successful, sets "paid" to "true"
    invoice.paid = True
    db.session.commit()
    return jsonify({"message": f"Invoice {invoice_id} marked as paid."})

if __name__ == "__main__":
    # For the whole app, imagine proper authentication and authorization to be in place
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=False)
