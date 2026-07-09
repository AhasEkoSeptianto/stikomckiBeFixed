const express = require("express");

const isAuth = require("../../midleware/auth.js");

// Models
const User = require("../../models/mongodb/users.js");
const CallUs = require("../../models/mongodb/call_us.js");

// Controllers
const authController = require("../../controller/api/auth.js");
const adminController = require("../../controller/api/admin.js");
const mahasiswaController = require("../../controller/api/mahasiswa.js");
const dosenController = require("../../controller/api/dosen.js");
const broadcastController = require("../../controller/api/broadcast.js");
const settingController = require("../../controller/api/setting.js");
const MediaController = require("../../controller/api/media.js");
const VisitorController = require("../../controller/api/visitor.js");
const StatistikController = require("../../controller/api/statistik.js");

const router = express.Router();

// Visitor
router.get("/visitor", VisitorController.Setinfo);
router.get("/getvisitor", VisitorController.Getinfo);

// Statistik
router.get("/mhs-statistik", StatistikController.mahasiswa);

// Login
router.post("/login", authController.login);
router.post("/is-auth", isAuth, authController.is_auth);

// Admin
router.get("/admin", isAuth, adminController.Admin);
router.post("/admin/add", isAuth, adminController.AddAdmin);
router.put("/admin/edit", isAuth, adminController.EditAdmin);
router.delete("/admin/delete", isAuth, adminController.DeleteAdmin);

// Mahasiswa
router.get("/mahasiswa", isAuth, mahasiswaController.allMhs);
router.post("/mahasiswa/add", mahasiswaController.addMhs);
router.post("/mahasiswa/findMhs", mahasiswaController.findMhs);
router.put("/mahasiswa/update", mahasiswaController.updateMhs);
router.delete("/mahasiswa/delete", mahasiswaController.deleteMhs);
router.post("/mahasiswa/filter", mahasiswaController.filterMhs);

// Dosen
router.get("/dosen", dosenController.allDosen);
router.post("/dosen/add", dosenController.addDosen);
router.delete("/dosen/delete", dosenController.delete_dosen);
router.put("/dosen/update", dosenController.update_dosen);
router.post("/dosen/find_dosen", dosenController.find_dosen);
router.post("/dosen/filter_dosen", dosenController.filter_dosen);

// Broadcast
router.get("/broadcast/allData", broadcastController.allData);
router.post("/broadcast/addImage", broadcastController.addImage);
router.post("/broadcast/addNews", isAuth, broadcastController.addNews);
router.post("/broadcast/delete", isAuth, broadcastController.deleteNews);

// Setting
router.post("/setting/change-name", settingController.changeName);

// Call Us
router.post("/call-us", async (req, res) => {
  const newGuest = new User({
    name: req.body.name,
    email: req.body.email,
    msg: req.body.msg,
  });

  await newGuest.save();

  res.status(200).json({
    status: "success",
  });
});

// Google Media
router.get("/authorize-media", MediaController.AuthMediaLink);
router.post("/login-google", MediaController.GetTokenGoogle);

module.exports = router;
