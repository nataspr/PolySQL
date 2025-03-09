const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/add', adminController.addData);
router.get('/rolesPanel', adminController.getRolesPanel);
router.get('/rolesList', adminController.getRolesList);
router.post('/updateRoles', adminController.updateRoles);

module.exports = router;