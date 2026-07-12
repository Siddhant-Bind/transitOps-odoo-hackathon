import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:8080"];

const isDev = process.env.NODE_ENV !== 'production';

app.use(
  cors({
    origin: isDev ? true : (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));

// ── Route imports ──────────────────────────────────────────
import authRoutes from './routes/auth.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import driverRoutes from './routes/driver.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import tripRoutes from './routes/trip.routes.js';
import maintenanceRoutes from './routes/maintenance.routes.js';
import fuelRoutes from './routes/fuel.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import reportsRoutes from './routes/reports.routes.js';

// ── Route declarations ─────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "TransitOps API v1" });
});

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportsRoutes);

// ── Global Error Handler ────────────────────────────────────
app.use(errorHandler);

export { app };