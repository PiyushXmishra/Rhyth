"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controllers/usercontroller");
const router = (0, express_1.Router)();
// Use the route handlers
router.post('/register', usercontroller_1.registerUser);
router.post('/login', usercontroller_1.loginUser);
exports.default = router;
