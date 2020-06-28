"use strict";

const logins = require("../controllers/loginController");

const express = require("express");
const Router = express.Router;

const router = Router();
const Auth = require("../controllers/Auth");

router.route("/v1/auth/register").post(logins.register);

router.route("/v1/auth/users").get(logins.users);

router
  .route("/v1/auth/changepassword")
  .post(Auth.authMiddleware, logins.change_password);

router
  .route("/v1/auth/token")
  .get(Auth.authMiddleware,logins.tokenValidator);

router
  .route("/v1/auth/session")
  .post(logins.login)
  .delete(Auth.authMiddleware, logins.logout)
  .get(Auth.authMiddleware, logins.renew);

module.exports = router;
