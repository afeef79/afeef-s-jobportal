import express from 'express'
import { loginCompany, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer'


const router = express.Router()

//register a company
router.post('/register',upload.single('image'), registerCompany)

//company login
router.post('/login', loginCompany)

//get company data
router.get('/Company', getCompanyData)

//post a job
router.post('/post-Job', postJob)

//get applicants data of comapany
router.get('/applicants', getCompanyJobApplicants)

//get company job list
router.get('/list-jobs', getCompanyPostedJobs)

//change application status
router.post('/change-status', changeJobApplicationsStatus)

//change application visibility
router.post('/change-visibility', changeVisibility)


export default router;