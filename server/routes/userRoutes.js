import express from 'express'
import { applyForJob,getUserData,getUserJobApplications,updatedUserResume } from '../controllers/userContoller.js'
import upload from '../config/multer.js'

const router = express.Router()

//get uder data
router.get('/user',getUserData)


//apply for a job
router.post('/apply',applyForJob)

//get applied jobs data
router.get('/applications',getUserJobApplications)

//upadted user profile(resume)
router.post('/update-resume',upload.single('resume'),updatedUserResume)


export default router