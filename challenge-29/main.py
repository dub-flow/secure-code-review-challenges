from flask import Flask, request, jsonify
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
    amount = db.Column(db.Float)
    description = db.Column(db.String(255))
    paid = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "amount": self.amount,
            "description": self.description,
            "paid": self.paid
        }

@app.route("/invoices", methods=["POST"])
def create_invoice():
    data = request.json
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
    
    # Imagine some proper payment logic here that allows you paying the invoice
    invoice.paid = True
    db.session.commit()
    return jsonify({"message": f"Invoice {invoice_id} marked as paid."})

if __name__ == "__main__":
    # For the whole app, imagine proper authentication and authorization to be in place
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=False)
