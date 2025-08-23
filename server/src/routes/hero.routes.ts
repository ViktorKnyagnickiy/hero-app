
import { Router } from "express";
import * as C from "../controllers/hero.controller";
import { upload } from "../middleware/upload";

const r = Router();

r.get("/", C.list);
r.get("/:id", C.getOne);
r.post("/", C.create);
r.put("/:id", C.update);
r.delete("/:id", C.remove);

r.post("/:id/images", upload.array("images", 10), C.uploadImages);
r.delete("/:id/images/:imageId", C.deleteImage);

export default r;
