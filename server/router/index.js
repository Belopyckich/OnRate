const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const kanbanController = require("../controllers/kanban-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const fileController = require("../controllers/file-controller");

router.post(
  "/auth/registration",
  body("name").isLength({ min: 3, max: 15 }),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/auth/login", userController.login);
router.post("/auth/logout", userController.logout);
router.get("/auth/activate/:link", userController.activate);
router.get("/auth/refresh", userController.refresh);
router.post("/user/update", userController.updateUser);
router.get("/user/get-backgrounds", fileController.getBackgrounds);
router.post("/user/set-start-page", userController.setUserStartPage);
router.post("/user/set-background", userController.setUserBackground);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/kanban/create-column", kanbanController.kanbanColumnCreate);
router.post("/kanban/delete-column", kanbanController.kanbanColumnDelete);
router.post("/kanban/edit-column", kanbanController.KanbanColumnEdit);
router.post("/kanban/move-column", kanbanController.KanbanColumnMove);
router.get("/kanban/columns", kanbanController.getKanbanColumns);
router.post("/kanban/create-task", kanbanController.kanbanTaskCreate);
router.post("/kanban/edit-task", kanbanController.kanbanTaskEdit);
router.post("/kanban/move-task", kanbanController.kanbanTaskMove);
router.post("/kanban/delete-task", kanbanController.kanbanTaskDelete);
router.post("/kanban/tasks-by-column", kanbanController.getKanbanTasksByColumn);

module.exports = router;
