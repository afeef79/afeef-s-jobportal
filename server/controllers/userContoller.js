import Job from "../models/job.js"
import JobApplication from '../models/jobApplication.js'
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"

//get user data
export const getUserData = async (req, res,) => {

    const userId = req.auth.userId

    try {
        const user = await User.findById(userId)
            if(!user){
                return res.json({success:false, message:'User Not Found'})
            }
        res.json({success:true, user})
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }

}

//apply for a job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body
    const userId = req.auth.userId

    try {

        const isAlreadyApplied = await changeJobApplicationsStatus.find({job,userId})

        if(isAlreadyApplied){

            return res.json({success:false, message:'You have already applied for this job.'})

            }

            const jobData = await Job.findById(jobId)

            if (!jobData) {
                return res.json({ success: false, message: 'Job Not Found' })
                
            }
            await changeJobApplicationsStatus.create({
                companyId: jobData.companyId,
                userId,
                jobId,
                date:Date.now()
            })
            res.json({success:true, message:'Job Applied Successfully'})

    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}


//get user applied applications
export const getUserJobApplications = async (req, res) => {
    try{
        const userId = req.auth.userId
        const application = await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()

        if (!applications) {
            return res.json({ success: false, message: 'No job applications found for the user' })
            
        }
        return res.json({success:true, applications})
    }catch(error){
        res.json({success:false, message:error.message})
    }

}

//update user resume
export const updatedUserResume = async (req, res) => {
    try{
        const userId = req.auth.userId
        const resumeFile = req.resumeFile

        const userData = await User.findById(user.Id)
        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader
            userData.resume = resumeUpload.secure_url
        }
        await userData.save()
        return res.json({success:true, message:'Resume Updated Successfully'})
    }catch(error){
    res.json({success:false, message:error.message})
    }
}