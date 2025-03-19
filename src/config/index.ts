
import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(__dirname, '../../.env')})
export default {
    logDir : process.env.LOG_DIR || "logs", 
    isDev: process.env.NODE_ENV === "development",
    paths: {
        data: {
            cakeOrders: "src/data/cake orders.csv",
            bookOrders: "src/data/book orders.json",
            petOrders: "src/data/pet orders.json",
            clothingOrders: "src/data/clothing orders.csv",
            furnitureOrders: "src/data/furniture orders.xml",
            toyOrders: "src/data/toy orders.xml"
        }
    }
}