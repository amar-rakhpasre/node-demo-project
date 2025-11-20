const express = require("express")
const router = express.Router()

//module.exports = router


const { Pool } = require("pg")

// Create a new pool for handling database connections
// using variables

const pool = new Pool({
  user: 'amar',
  host: '172.31.19.134',
  database: 'budget_tracker',
  password: 'root',
  port: 5432,
})
/*

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
*/
/*
// or using connection string
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: true,
})
*/
// Define route to get all expenses
router.get("/expenses", async (req, res) => {
  try {
    const query = "SELECT * FROM expenses"
    const { rows } = await pool.query(query)
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ...


// Define route to add a new expense
router.post("/expenses", async (req, res) => {
  try {
    const { name, amount, date } = req.body
    const query =
      "INSERT INTO expenses (name, amount, date) VALUES ($1, $2, $3) RETURNING *"
    const { rows } = await pool.query(query, [name, amount, date])

    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ...

// Define route to update an expense
router.put("/expenses/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { name, amount, date } = req.body
    const query =
      "UPDATE expenses SET name = $1, amount = $2, date = $3 WHERE id = $4 RETURNING *"
    const { rows } = await pool.query(query, [name, amount, date, id])
    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ...



// Define route to remove an expense
router.delete("/expenses/:id", async (req, res) => {
  try {
    const id = req.params.id
    const query = "DELETE FROM expenses WHERE id = $1"
    await pool.query(query, [id])
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ...

module.exports = router


