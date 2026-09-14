import { Router } from 'express';
import { signup, login, getMe } from '../controllers/auth.controller.js';
const router = Router();
import requireAuth from '../middleware/auth.middleware.js';
import requiredrole from '../middleware/roles.middlreware.js';
router.get("/admin", requireAuth, requiredrole("admin"), (req, res) => {
    res.json({
        messsage: "welcome admin"
    });
});
router.post('/signup', signup);
router.post("/login", login);
router.get("/me", requireAuth, getMe);
export default router;
