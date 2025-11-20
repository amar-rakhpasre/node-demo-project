const express = require("express")
const router = express.Router()

module.exports = router



const { Sequelize, DataTypes } = require("sequelize")

// Create an instance of Sequelize and connect to the database
const sequelize = new Sequelize(process.env.MYSQL_CONNECTION_STRING);

// or
/*
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
})
*/

// ...

// Define the Expense model
const Expense = sequelize.define(
  "expense",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
)

// Synchronize the model with the database
sequelize.sync({ forced: true })

// ...


// ...

// Define route to get all expenses
router.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.findAll()
    res.json(expenses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ...


// Define route to create new expense in the table

router.post("/expenses", async (req, res) => {
  try {
    const { name, amount, date } = req.body
    const expense = await Expense.create({ name, amount, date })
    await expense.save()
    res.json(expense)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ...


// Define route to update a specific expense in the table
router.put("/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id)
    if (expense) {
      const { name, amount, date } = req.body
      expense.name = name
      expense.amount = amount
      expense.date = date
      await expense.save()
      res.json(expense)
    } else {
      res.status(404).json({ message: "Expense not found" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ...


// Define route to delete a specific expense in the table
router.delete("/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: {
        id: req.params.id,
      },
    })
    if (expense) {
      await expense.destroy()
      res.json({ message: "Expense deleted" })
    } else {
      res.status(404).json({ message: "Expense not found" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// ...



