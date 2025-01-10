import { Webhook } from "svix";
import User from "../models/User.js";

//API controller function to manage clerk User with database

export const clerkWebhooks = async (req, res) =>{
    try {

        //Create a Svix instance with cleark webhook secret.
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

        //verifying Headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        //getting date from request body
        const {data, type} = req.body

        //switch casefor different Events
        switch (type) {
            case "user.created":{

                const userData ={
                    _id:data.id,
                    email:data.email_addressess[0].email_address,
                    name:data.first_name+" "+Date.last_name,
                    image:data.image_url,
                    resume:''
                }
                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.upadate':{
                const userData ={
                    email:data.email_addressess[0].email_address,
                    name:data.first_name+" "+Date.last_name,
                    image:data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
        }

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:'Webhooks Error'})
    }
}