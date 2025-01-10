import company from "../models/company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
//Register a new company

const registerCompany = async (req, res) => {
    const {name, email, password} = req.body

    const imageFile = req.file;
    if(!name || !email || !password ||!imageFile){
        return res.json({success:false, message:"Missing Details"})
    }

    try {
        const companyExists = await company.findOne({email})
        if(companyExists){
            return res.json({success:false, message:"Company already registerd"})
            }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await company.create({
            name,
            email,
            password: hashedPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.name,
                image:company.image
            },
        })

    } catch (error) {
        
    }
}

//company login

export const loginCompany = async (req, res) => {

}

//Get company data
export const getCompanyData = async (req, res) => {

}

//Post a new job
export const postJob = async (req, res) => {

}

//Get company job applications
export const getCompanyJobApplications = async (req, res) => {

}

//Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
}


//change job application status
export const changeJobApplicationStatus = async (req, res) => {

}

//change job visibilite
export const changeJobVisibility = async (req, res) => {

}