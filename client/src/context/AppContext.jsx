import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {


    const [searchFilter,setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin,setShowRecruiterLogin] = useState(false)




    // Function to add fetch jobs
    const fetchJobs = async () =>{
        setJobs(jobsData)
    }

    useEffect(()=>{
        fetchJobs()
    },[])

    const value = {
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}

// import { createContext, useEffect, useState } from "react";
// import { jobsData } from "../assets/assets";

// // Create the AppContext
// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [searchFilter, setSearchFilter] = useState({
//     title: "",
//     location: "",
//   });

//   const [isSearched, setIsSearched] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

//   // Function to simulate fetching jobs
//   const fetchJobs = async () => {
//     setJobs(jobsData);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const value = {
//     searchFilter,
//     setSearchFilter,
//     isSearched,
//     setIsSearched,
//     jobs,
//     setJobs,
//     showRecruiterLogin,
//     setShowRecruiterLogin,
//   };

//   // Provide the context value to children components
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };
