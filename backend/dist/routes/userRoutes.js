"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controllers/usercontroller");
const songcontroller_1 = require("../controllers/songcontroller");
const router = (0, express_1.Router)();
// Use the route handlers
router.post('/register', usercontroller_1.registerUser);
router.post('/login', usercontroller_1.loginUser);
router.get('/search', songcontroller_1.searchSongs);
exports.default = router;
