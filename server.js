const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");

const app = express();
dotenv.config({ path: './config/config.env' })

//Router file
const media = require("./routes/media");

//Body Parser
app.use(express.json())

//Mount routers
app.use('/media',media)

//custom error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`)
})