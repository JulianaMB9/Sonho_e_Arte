const AdminModel = require('../models/adminModel.js')

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.readList();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const newAdmin = req.body;
    const admin = await AdminModel.create(newAdmin);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await AdminModel.read(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = req.body;
    const admin = await AdminModel.update(updatedAdmin, req.params.id);
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    await AdminModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
