import { Router } from 'express'
import CredentialsController from './Controller/CredentialsController'

const routes = Router()

routes.post('/credentials', CredentialsController.create)
routes.get('/credentials/:filter', CredentialsController.show)
routes.get('/credentials', CredentialsController.destroy)

export default routes