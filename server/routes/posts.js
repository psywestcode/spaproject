import { Router } from 'express'
import {
  listPublished,
  listMine,
  getOne,
  create,
  update,
  remove,
} from '../controllers/postController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = Router()

router.get('/', listPublished)
router.get('/mine', isAuthenticated, listMine)
router.get('/:id', getOne)
router.post('/', isAuthenticated, create)
router.put('/:id', isAuthenticated, update)
router.delete('/:id', isAuthenticated, remove)

export default router
