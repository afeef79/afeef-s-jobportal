// import React, { useContext, useEffect, useState } from 'react'
// import { manageJobsData } from '../assets/assets'
// import moment from 'moment'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const ManageJobs = () => {

//   const navigate = useNavigate()

//   const [jobs,setJobs] = useState(false)

//   // const [jobs, setJobs] = useState([])



//   const { backendUrl, companyToken } = useContext(AppContext)

//   // function to fetch company job application data
//   const fetchCompanyjobs = async () => {
  
//     try {
//       const {data} = await axios.get(backendUrl+'/api/company/list-jobs',
//         {headers:{token:companyToken}}
//       )
//       if (data.success){
//         setJobs(data.jobsData.reverse())
//         console.log(data.jobsData);

//       } else {
//         toast.error(data.message)
//       }
//     } catch (error){
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     if (companyToken) {
//       fetchCompanyjobs()
//     }
//   },[companyToken])

//   return (
//     <div className='container p-4 max-w-5xl'>
//       <div className='overflow-x-auto'>
//         <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
//           <thead>
//             <tr>
//               <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
//               <th className='py-2 px-4 border-b text-left'>Job Title</th>
//               <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
//               <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
//               <th className='py-2 px-4 border-b text-center'>Applicants</th>
//               <th className='py-2 px-4 border-b text-left'>Visible</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job,index)=>(
//               <tr key={index} className='text-gray-700'>
//                   <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
//                   <td className='py-2 px-4 border-b'>{job.title}</td>
//                   <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
//                   <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
//                   <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
//                   <td className='py-2 px-4 border-b'>
//                     <input className='scale-125 ml-4' type="checkbox" />
//                   </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className='mt-4 flex justify-end'>
//         <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>Add new job</button>
//       </div>
//     </div>
//   )
// }

// export default ManageJobs

// import React, { useContext, useEffect, useState } from 'react';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const ManageJobs = () => {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]); 
//   const { backendUrl, companyToken } = useContext(AppContext);


//   //Function to fetch company job application data
//   const fetchCompanyJobs = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
//         headers: { token: companyToken },
//       });

//       if (data.success) {
//         setJobs(Array.isArray(data.jobsData) ? data.jobsData.reverse() : []);
//       } else {
//         console.error('API Error:', data.message);
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error('Fetch Error:', error.message);
//       toast.error('Failed to fetch jobs. Please try again.');
//     }
//   };

//   // function to change job visibility
//   const changeJobVisibility = async (id) => {
//       try {
        
//         const {data} = await axios.post(backendUrl + '/api/company/change-visibility',
//           { id },
//           { headers:{token:companyToken} }
//         )
        
//         if(data.success){
//           toast.success(data.message)
//           fetchCompanyJobs()
//         } else {
//           toast.error(data.message)
//         }


//       } catch (error) {
//         toast.error(error.message)
//       }
//   }

//   useEffect(() => {
//     if (companyToken) {
//       fetchCompanyJobs();
//     }
//   }, [companyToken]);

//   return (
//     <div className="container p-4 max-w-5xl">
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
//               <th className="py-2 px-4 border-b text-left">Job Title</th>
//               <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
//               <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
//               <th className="py-2 px-4 border-b text-center">Applicants</th>
//               <th className="py-2 px-4 border-b text-left">Visible</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(jobs) && jobs.length > 0 ? (
//               jobs.map((job, index) => (
//                 <tr key={index} className="text-gray-700">
//                   <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
//                   <td className="py-2 px-4 border-b">{job.title || 'N/A'}</td>
//                   <td className="py-2 px-4 border-b max-sm:hidden">
//                     {moment(job.date).format('ll') || 'N/A'}
//                   </td>
//                   <td className="py-2 px-4 border-b max-sm:hidden">{job.location || 'N/A'}</td>
//                   <td className="py-2 px-4 border-b text-center">{job.applicants || 0}</td>
//                   <td className="py-2 px-4 border-b">
//                     <input onChange={() => changeJobVisibility(job._id)}
//                       className="scale-125 ml-4"
//                       type="checkbox"
//                       checked={job.visible}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-gray-500">
//                   No jobs available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={() => navigate('/dashboard/add-job')}
//           className="bg-black text-white py-2 px-4 rounded"
//         >
//           Add new job
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ManageJobs;

// import React, { useContext, useEffect, useState } from 'react';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ManageJobs = () => {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]); // Initialize as an empty array
//   const { backendUrl, companyToken } = useContext(AppContext);

//   // Function to fetch company job application data
//   const fetchCompanyJobs = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
//         headers: { token: companyToken },
//       });

//       if (data.success) {
//         setJobs(Array.isArray(data.jobsData) ? data.jobsData.reverse() : []);
//       } else {
//         console.error('API Error:', data.message);
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error('Fetch Error:', error.message);
//       toast.error('Failed to fetch jobs. Please check your backend or API configuration.');
//     }
//   };

//   // Function to change job visibility
//   const changeJobVisibility = async (id) => {
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/company/change-visibility`,
//         { id },
//         { headers: { token: companyToken } }
//       );

//       if (data.success) {
//         toast.success(data.message || 'Job visibility updated successfully');
//         fetchCompanyJobs();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error('Visibility Error:', error.message);
//       toast.error('Failed to update job visibility. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (companyToken) {
//       fetchCompanyJobs();
//     }
//   }, [companyToken]);

//   return (
//     <div className="container p-4 max-w-5xl">
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
//               <th className="py-2 px-4 border-b text-left">Job Title</th>
//               <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
//               <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
//               <th className="py-2 px-4 border-b text-center">Applicants</th>
//               <th className="py-2 px-4 border-b text-left">Visible</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(jobs) && jobs.length > 0 ? (
//               jobs.map((job, index) => (
//                 <tr key={index} className="text-gray-700">
//                   <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
//                   <td className="py-2 px-4 border-b">{job.title || 'N/A'}</td>
//                   <td className="py-2 px-4 border-b max-sm:hidden">
//                     {moment(job.date).format('ll') || 'N/A'}
//                   </td>
//                   <td className="py-2 px-4 border-b max-sm:hidden">{job.location || 'N/A'}</td>
//                   <td className="py-2 px-4 border-b text-center">{job.applicants || 0}</td>
//                   <td className="py-2 px-4 border-b">
//                     <input
//                       onChange={() => changeJobVisibility(job._id)}
//                       className="scale-125 ml-4"
//                       type="checkbox"
//                       checked={job.visible}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-gray-500">
//                   No jobs available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={() => navigate('/dashboard/add-job')}
//           className="bg-black text-white py-2 px-4 rounded"
//         >
//           Add new job
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ManageJobs;

import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]); // Initialize as an empty array
  const { backendUrl, companyToken } = useContext(AppContext);

  // Function to fetch company job application data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(Array.isArray(data.jobsData) ? data.jobsData.reverse() : []);
      } else {
        console.error('API Error:', data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      toast.error('Failed to fetch jobs. Please check your backend or API configuration.');
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{job.title || 'N/A'}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {moment(job.date).format('ll') || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">{job.location || 'N/A'}</td>
                  <td className="py-2 px-4 border-b text-center">{job.applicants || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No jobs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
