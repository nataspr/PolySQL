const adminService = require('../services/adminService');

const addData = async (req, res) => {
    const { formType, data } = req.body;
    try {
        await adminService.addData(formType, data);
        res.status(200).send({ message: 'Data successfully saved' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

const getRolesPanel = async (req, res) => {
    try {
        const rolesPanel = await adminService.getRolesPanel();
        res.json(rolesPanel);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getRolesList = async (req, res) => {
    try {
        const rolesList = await adminService.getRolesList();
        res.json(rolesList);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateRoles = async (req, res) => {
    const updatedRoles = req.body;
    try {
        await adminService.updateRoles(updatedRoles);
        res.status(200).json({ message: 'Roles updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update roles' });
    }
};

module.exports = { addData, getRolesPanel, getRolesList, updateRoles };