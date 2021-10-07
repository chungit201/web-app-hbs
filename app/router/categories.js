import express from 'express';
import { categoryController } from '../controller/categories';
const roter = express.Router();
    roter.get('/categories',categoryController.list);
    roter.post('/categories',categoryController.create)
module.exports = roter