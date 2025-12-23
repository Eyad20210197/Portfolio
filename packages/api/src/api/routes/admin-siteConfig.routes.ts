import { Router } from "express";
import siteConfigController from "../../controllers/siteConfig.controller";
import { isAdmin } from "../../middleware/auth";
import validate from "../../middleware/validation.middleware";
import {
  createSiteConfigSchema,
  updateSiteConfigSchema,
  getSiteConfigByIdSchema,
} from "../../schemas/siteConfig.schema";

const router = Router();

router.use(isAdmin);

router.get("/site-config", siteConfigController.getAll);
router.get(
  "/site-config/:id",
  validate(getSiteConfigByIdSchema),
  siteConfigController.getById
);
router.post(
  "/site-config",
  validate(createSiteConfigSchema),
  siteConfigController.create
);
router.put(
  "/site-config/:id",
  validate(updateSiteConfigSchema),
  siteConfigController.update
);
router.delete(
  "/site-config/:id",
  validate(getSiteConfigByIdSchema),
  siteConfigController.delete
);

export default router;
