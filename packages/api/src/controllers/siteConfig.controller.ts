import { RequestHandler } from "express";
import siteConfigService from "../services/siteConfig.service";

class SiteConfigController {
  getAll: RequestHandler = async (_req, res) => {
    const configs = await siteConfigService.getAll();
    res.json(configs);
  };

  getById: RequestHandler = async (req, res) => {
    const config = await siteConfigService.getById(req.params.id);
    if (!config) return res.sendStatus(404);
    res.json(config);
  };

  getByKey: RequestHandler = async (req, res) => {
    const config = await siteConfigService.getByKey(req.params.key);
    if (!config) return res.sendStatus(404);
    res.json(config);
  };

  create: RequestHandler = async (req, res) => {
    const config = await siteConfigService.create(req.body);
    res.status(201).json(config);
  };

  update: RequestHandler = async (req, res) => {
    const config = await siteConfigService.update(req.params.id, req.body);
    res.json(config);
  };

  delete: RequestHandler = async (req, res) => {
    await siteConfigService.delete(req.params.id);
    res.sendStatus(204);
  };
}

export default new SiteConfigController();
