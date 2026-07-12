import express from "express";
import pool from "./config/db.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT NOW() AS currentTime"
        );

        res.json({
            success: true,
            message: "Database Connected Successfully",
            time: rows[0].currentTime
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database Connection Failed"
        });

    }
});

export default app;