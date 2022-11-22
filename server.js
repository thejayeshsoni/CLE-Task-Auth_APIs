const app = require("./app");
require("dotenv").config();
const connectDB = require("./configs/db");

const PORT = process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.DB_URL);
        app.listen(PORT, () => {
            console.log(`Server is listening at ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();