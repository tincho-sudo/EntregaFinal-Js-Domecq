const mongoose = require("mongoose");
const { app } = require("./app");

const { PORT, MONGODB_URI } = require("./config/env");

mongoose.set('strictQuery', true);
mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));


const port = PORT || process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
