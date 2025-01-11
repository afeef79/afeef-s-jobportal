import express from 'express'
import { changeVisiblity, changeJobApplicationsStatus, getCompanyPostedJobs, getCompanyJobApplications, postJob, getCompanyData, loginCompany, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js';


const router = express.Router()

//register a company
router.post('/register',upload.single('image'), registerCompany)

//company login
router.post('/login', loginCompany)

//get company data
router.get('/company', protectCompany, getCompanyData)

//post a job
router.post('/post-Job',protectCompany, postJob)

//get applicants data of comapany
router.get('/applicants',protectCompany, getCompanyJobApplications)

//get company job list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

//change application status
router.post('/change-status',protectCompany, changeJobApplicationsStatus)

//change application visibility
router.post('/change-visiblity',protectCompany, changeVisiblity)


export default router;