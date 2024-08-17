import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listing.controller.js";
import {
  authenticateUser,
  authUserPlusAnonymous,
} from "../middleware/authenticateUser.js";

const router = express.Router();

// router.post("/create", createListing);
// router.delete("/:id", deleteListing); // delete removed, no need
// router.patch("/update/:id", updateListing);
// router.get("/:id", getListing); // get removed no need
// router.get("/", getListings); // get removed, no need

router.get("/:id", getListing);
router.route("/").get(getListings).post(authenticateUser, createListing);
router
  .route("/:id")
  .patch(authenticateUser, updateListing)
  .delete(authenticateUser, deleteListing);

export default router;
