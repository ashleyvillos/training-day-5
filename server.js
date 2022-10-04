const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3002
const config = require('./config/config')
const dbContext = require('./services/db.context')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Modules
const StoreRouter = require('./routes/store.route')
const UserRouter = require('./routes/user.route')
const ProductRouter = require('./routes/product.route')

// Routing
app.use(StoreRouter)
app.use(UserRouter)
app.use(ProductRouter)


// Authenticate if DB is connected
config.authenticate()
.then(() => {
    // force: false  --> prevents resetting the table
    config.sync({ force: (process.env.RESET == 'true') }) // synchronize tables
    console.log('Successfully connected to DB')
})
.catch((err) => {
    console.log(err)
})

app.listen(port, (err) => {
    if (err) throw err
  console.log(`DB app listening on port ${port}`)
})