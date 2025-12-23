import { Router } from "express";
import siteConfigController from "../../controllers/siteConfig.controller";
import validate from "../../middleware/validation.middleware";
import { getSiteConfigByKeySchema } from "../../schemas/siteConfig.schema";

const router = Router();

router.get(
  "/site-config/:key",
  validate(getSiteConfigByKeySchema),
  siteConfigController.getByKey
);

export default router;
