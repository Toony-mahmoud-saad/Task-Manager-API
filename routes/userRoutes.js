const Router = require("express");
const router = Router();
const userController = require("../controllers/userController")


router.post("/api/users/register", userController.register);
router.post("/api/users/login", userController.login);
router.post("/api/users/logout/:id", userController.logout);


module.exports = router ;
