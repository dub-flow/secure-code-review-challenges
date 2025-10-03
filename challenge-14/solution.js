const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database('/data/database.db');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT)");
  db.run("INSERT OR IGNORE INTO accounts (id, balance) VALUES (1, 1000)");
  db.run("INSERT OR IGNORE INTO accounts (id, balance) VALUES (2, 1000)");
});

app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;

  if (typeof from !== 'number' || typeof to !== 'number' || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  db.serialize(() => {
    db.run("BEGIN EXCLUSIVE TRANSACTION", (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to start transaction' });
      }
      
      db.get("SELECT balance FROM accounts WHERE id = ?", [from], (err, row) => {
        if (err || !row) {
          db.run("ROLLBACK");
          return res.status(400).json({ message: 'Invalid from account' });
        }

        if (row.balance < amount) {
          db.run("ROLLBACK");
          return res.status(400).json({ message: 'Insufficient funds' });
        }

        db.run("UPDATE accounts SET balance = balance - ? WHERE id = ?", [amount, from], (err) => {
          if (err) {
            db.run("ROLLBACK");
            return res.status(500).json({ message: 'Database error' });
          }

          db.run("UPDATE accounts SET balance = balance + ? WHERE id = ?", [amount, to], (err) => {
            if (err) {
              db.run("ROLLBACK");
              return res.status(500).json({ message: 'Database error' });
            }

            db.run("COMMIT", (err) => {
              if (err) {
                db.run("ROLLBACK");
                return res.status(500).json({ message: 'Failed to commit transaction' });
              }

              res.status(200).json({ message: 'Transfer successful' });
            });
          });
        });
      });
    });
  });
});

app.get('/balance/:id', (req, res) => {
  db.get("SELECT balance FROM accounts WHERE id = ?", [req.params.id], (err, row) => {
    if (err || !row) {
      return res.status(400).json({ message: 'Invalid account' });
    }

    res.status(200).json({ balance: row.balance });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
