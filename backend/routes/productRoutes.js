
import express from 'express'

const router = express.Router()

import {addProduct, getProducts, getProductById} from '../controllers/productController.js'


router.route('/').post(addProduct).get(getProducts)
router.route('/:id').get(getProductById)


export default router;