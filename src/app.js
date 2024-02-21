import path from "node:path";

import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));

export default app;
