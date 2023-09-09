import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DisplayEvent from "./DisplayEvent";
import { json } from "react-router-dom";
import {CiEdit } from 'react-icons/ci'
import {IoMdArrowDropdown} from 'react-icons/io'
import { CgProfile} from 'react-icons/cg'


import "../App.css"
import LoadingScreen from "./Loader";
import Footer from './Footer';








// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';










export default function Home() {

















  // const [state, setState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };

  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );



















  const severPath = "https://servetasker.onrender.com"
  // const severPath = "http://127.0.0.1:5000";


  const collectionName = localStorage.getItem("collectionName");
  const userName = localStorage.getItem("userName");

  const [userDataDict, setuserDataDict] = useState({});
  const [NoOfDoingWorks, setNoOfDoingWorks] = useState(0);
  const [workSpace, setworkSpace] = useState("WorkSpace0")

  const [selectedToDoEvent, setSelectedToDoEvent] = useState(null);
  const [selectedDoingEvent, setSelectedDoingEvent] = useState(null);
  const [selectedDoneEvent, setSelectedDoneEvent] = useState(null);


  const [showToDoEventModal, setShowToDoEventModal] = useState(false);
  const [showDoingEventModal, setShowDoingEventModal] = useState(false);
  const [showDoneEventModal, setShowDoneEventModal] = useState(false);


  const [isLoading, setIsLoading] = useState(false);

  const [openWSDropdown, setopenWSDropdown] = useState(false);
  const [openProfileDropdown, setopenProfileDropdown] = useState(false);



  const [bgColor, setbgColor] = useState("bg-white")


  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const navigate = useNavigate();



  // Add a click event listener to the document
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target) )  {
        // Click occurred outside the dropdown, close it
        // setopenWSDropdown(false);
        setopenProfileDropdown(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))  {
        // Click occurred outside the dropdown, close it
        setopenWSDropdown(false);
        // setopenProfileDropdown(false);
      }
    };
    

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);







    const fetchData = async () => {
      const data = {
        collectionName: collectionName,
      };

      try {
        setIsLoading(true);
        const response = await axios.post(severPath+"/getUserData", data);
        setIsLoading(false);
        const userData = response.data["data"][0]; // Assuming you want to store the first item in the array

        // Check if the nested properties exist before accessing them
        const workspace0 = userData[workSpace];
        const allWorks = workspace0?.Doing?.AllWorks;

        if (allWorks) {
          // Set the NoOfDoingWorks state based on the length of allWorks
          setNoOfDoingWorks(allWorks.length);
        }
        

        // Set the userDataDict state
        setuserDataDict(userData);

        console.warn(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    useEffect(() => {


    fetchData();
    }, []);
  

    const deleteEvent = async(e, workSpace, eventType, eventName) => {
        e.preventDefault()
        const data = {
            "collectionName":collectionName,
            "WorkSpace":workSpace,
            "eventName":eventName,
            "eventType":eventType
        }
        setIsLoading(true);

        const response = await axios.post(severPath+"/deleteEvent", data)
        console.warn(response.data)
        setIsLoading(false);
        
      }


      const addWorkspace = async(e) => {
        e.preventDefault();
        const data={
          "collectionName": collectionName
        }
        setIsLoading(true);
        const response  =await axios.post(severPath+"/addWorkspace", data)
        console.warn(response.data)
        setIsLoading(false);
        fetchData();
        
      }







  const onDragStart = (e, eventData, eventName, eventType) => {
    e.dataTransfer.setData("EventData", JSON.stringify(eventData));
    e.dataTransfer.setData("EventName", eventName);
    e.dataTransfer.setData("EventType", eventType);
  };
  



  const onDrop = (e,id) => {
    e.preventDefault();
  
    // Retrieve the dropped event data
    const eventData = JSON.parse(e.dataTransfer.getData("EventData"));
    const eventName = e.dataTransfer.getData("EventName");
    const eventType = e.dataTransfer.getData("EventType")

    // Determine the drop target (e.target)
    const dropTargetId = id;
  
    // Implement your logic for handling the drop here
    console.warn("Dropped Event Data:", eventData,eventName, eventType);
    console.warn("Drop Target ID:", id);
  
    // Update your application state or perform other actions based on the drop


    const sendData = {
        "collectionName":collectionName,
        "WorkSpace":workSpace,
        "typeToAdd":dropTargetId,
        "workToAdd":eventName,
        "dataToAdd":eventData,
        "typeToDelete":eventType,
        "workToDelete":eventName
    }

    const shiftEventData =  async()=>{
    
    setIsLoading(true)

    const response = await axios.post(severPath+"/shiftEvent", sendData)
    setIsLoading(false)

    fetchData();
    console.warn(response.data)
    }
    shiftEventData();

  };


  

  const onDragOver = (e,id) => {
    e.preventDefault(); // Prevent the default behavior to allow dropping
    // console.warn(id);
};




  
  const showToDoEventDetails = (e, eventName, eventType) => {
    // Set the selected event when the button is clicked
    setSelectedToDoEvent({ eventName, eventType });
  };


  const closeToDoEventDetails = () => {
    // Clear the selected event when the close button is clicked
    fetchData();
    setSelectedToDoEvent(null);
    setShowToDoEventModal(false);

  };

  const showDoingEventDetails = (e, eventName, eventType) => {
    // Set the selected event when the button is clicked
    setSelectedDoingEvent({ eventName, eventType });
  };


  const closeDoingEventDetails = () => {
    // Clear the selected event when the close button is clicked
    fetchData();
    setSelectedDoingEvent(null);
    setShowDoingEventModal(false);

  };

  const showDoneEventDetails = (e, eventName, eventType) => {
    // Set the selected event when the button is clicked
    setSelectedDoneEvent({ eventName, eventType });
  };


  const closeDoneEventDetails = () => {
    // Clear the selected event when the close button is clicked
    fetchData();
    setSelectedDoneEvent(null);
    setShowDoneEventModal(false);
  };






  return (
    <>


        {isLoading &&  <LoadingScreen />}



        {/* <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div> */}

    










        <div className="Nav">
        <div className="md:px-5 px-2 sm:px-2 py-5 bg-blue-500">
            <div className="flex items-end justify-between">
                <div className="flex items-center text-5xl font-bold md:px-5">
                    <p>Tasker</p>
                </div>
                <div className="pl-0 flex">



                    <div className="flex items-end md:space-x-4">




                      <div className="flex-col relative" ref={dropdownRef}>
                        <div className="flex items-center space-x-1 text-lg font-semibold md:text-2xl">
                            <p>{workSpace}</p> 
                            <IoMdArrowDropdown onClick={()=>{
                              console.warn(openWSDropdown)

                              setopenWSDropdown((prevOpenWSDropdown) => !prevOpenWSDropdown);
                              console.warn(openWSDropdown)
                              }} className="cursor-pointer"/>
                        </div>
                          {openWSDropdown && (
                            <div className="max-h-0  ">
                              <div className="flex-col py-4 shadow-2xl border border-black rounded-lg space-y-1 max-h-40 overflow-y-auto p-2  bg-slate-200">
                                
                                {Object.keys(userDataDict).slice(0,-1).map((key, index)=>(

                                  <p className="cursor-pointer py-1 hover:text-xl font-semibold" 
                                  onClick={()=>{
                                      setworkSpace(key);
                                      fetchData()
                                      setopenWSDropdown(false)
                                      }}
                                   key={index}>
                                   {key}
                                   </p>                                 
                            ))}
                            <button
                             className="p-1 px-2 bg-blue-200 rounded-lg hover:text-xl font-semibold"
                            onClick={addWorkspace}
                            >Add + </button>                               

                          </div>
                          </div>
                          )}
                      </div>





                        <div className="flex-col relative " ref={profileDropdownRef}>

                        <div className="flex items-center space-x-1 text-3xl md:text-4xl">
                          <p>&nbsp;</p>
                          <CgProfile  onClick={()=>(setopenProfileDropdown(!openProfileDropdown))} className="cursor-pointer" />
                        </div>

                          {openProfileDropdown && (
                            <div className=" max-w-1 absolute right-2 text-lg font-semibold">
                              <div className="flex-col space-y-3 py-5 shadow-2xl border border-black rounded-lg  max-h-200 overflow-y-auto p-2   bg-slate-200">
                                <div className="flex justify-center text-4xl font-bold"><p className="border rounded-full p-5 px-7 bg-blue-900 text-white border-black">{userName.slice(0,1)}</p></div>
                                <p >{userName}</p>
                                <p>{collectionName}@gmail.com</p>
                                <p>Select Theme</p>
                                
                                <button onClick={()=>{setbgColor("bg-red-300")}} className="p-4 mr-1 bg-red-300" ></button>
                                <button onClick={()=>{setbgColor("bg-purple-400")}} className="p-4  bg-purple-400" ></button><br/>
                                <button onClick={()=>{setbgColor("bg-green-400")}} className="p-4 mr-1 bg-green-400" ></button>
                                <button onClick={()=>{setbgColor("bg-pink-400")}} className="p-4 bg-pink-400" ></button><br/>
                                <button onClick={()=>{setbgColor("bg-[#191825]")}} className="p-4 mr-1 bg-[#191825]" ></button>
                                <button onClick={()=>{setbgColor("bg-white")}} className="p-4 bg-white border border-black border-solid" ></button><br/>

                                <button
                                 className="p-2 rounded-lg my-2 bg-blue-800 text-white"
                                 onClick={()=>{
                                  localStorage.removeItem("collectionName");
                                  localStorage.removeItem("userName");
                                  navigate('/')
                                 }}
                                 >Logout</button>
                                                              
                          </div>
                          </div>
                          )}

                              
                        </div>
                          
                       



                        {/* <p><b>ogin</b></p> */}
                        {/* <p><b>Register</b></p> */}
                    </div>
                </div>
            </div>
        </div>
        </div>









      <div className={" flex-col  "+(bgColor)}>

        <div className=" md:flex justify-center items-start py-20 md:px-20 space-y-5 md:space-x-20">
                  
        <div
           className="bg-[#E3F6FF] border p-5 rounded-lg m-4  md:px-8 lg:px-20 md:py-10 py-8"
            id="ToDo"
            onDragOver={(e) => onDragOver(e, "ToDo")} // Pass the target ID to onDragOver
            onDrop={(e) => onDrop(e, "ToDo")} // Pass the target ID to onDrop
            >
            <p className="text-3xl font-bold pb-2">ToDo</p>


            {userDataDict[workSpace]?.ToDo?.AllWorks.map((work, index) => (
                
                <div key={index} className="flex items-center justify-center">
                <button
                className="flex text-2xl font-semibold text-white bg-[#3330E4] items-center border  pl-3 pr-3 py-4 rounded-lg my-2  border-solid"
                    key={index}
                    draggable="true"
                    onDragStart={(e) => onDragStart(e, userDataDict[workSpace]?.ToDo[work], work, "ToDo")}
                    onClick={(e)=>{
                        // console.error("im clicked");
                        // setShowEventModal(true);
                        showToDoEventDetails(e, work, "ToDo");
                        }}
                >
                    {work}
                    <CiEdit className="flex ml-2"/>
                </button>
                
                </div>
                

                ))}
                        
                <div className="flex justify-center">
                <button
                className="flex items-center border text-3xl text-white bg-[#27005D] border-black pl-2 pr-2 py-1 rounded-lg my-2  border-solid"
                    
                    // draggable="true"
                    // onDragStart={(e) => onDragStart(e, userDataDict[workSpace]?.ToDo[work], work, "ToDo")}
                    onClick={(e)=>{
                        // console.error("im clicked");
                        setShowToDoEventModal(true);
                        // showToDoEventDetails(e, work, "ToDo");
                        }}
                >+</button>
                </div>

                {showToDoEventModal && (
                    <div className="modal-overlay">
                    <div className="bg-white border border-black rounded-2xl w-fit p-5">
                <DisplayEvent
                    eventName={""}
                    workSpace={workSpace}
                    type={"ToDo"}
                    eventData={ {"status":"", "description" : "", "startDate" : "01-01-2023", "deadLine" : "01-01-2023"}}
                    />
                    <button className="p-2  mx-5 rounded-lg font-semibold bg-red-400" onClick={closeToDoEventDetails}>Close</button>

                </div>
                </div>

                )}





                {selectedToDoEvent && (
                    <div className="modal-overlay">
                    <div className="bg-white border border-black rounded-2xl w-fit p-5">
                <DisplayEvent
                    eventName={selectedToDoEvent.eventName}
                    workSpace={workSpace}
                    type={selectedToDoEvent.eventType}
                    eventData={userDataDict[workSpace]?.[selectedToDoEvent.eventType][selectedToDoEvent.eventName]}
                    />
                    <button className="p-2   mx-5 rounded-lg font-semibold bg-red-400" onClick={closeToDoEventDetails}>Close</button>
                    <button className="p-2   mx-5 rounded-lg font-semibold bg-red-400" onClick={(e)=>deleteEvent(e, workSpace, selectedToDoEvent.eventType, selectedToDoEvent.eventName)}>Delete</button>
                </div>
                </div>

                )}




                {/* <p key={index}>{work}</p> */}

            {/* {userDataDict[workSpace]?.ToDo?.AllWorks.map((work, index) => (
                <DisplayEvent id="ToDoWorks" key={index} eventName={work} workSpace={workSpace} type="ToDo" eventData={userDataDict[workSpace]?.ToDo[work]} />
                ))}
             */}


            {/* <p>{userDataDict?.WorkSpace0?.Doing?.AllWorks[0]}</p> */}
          </div>

          <div
           className="bg-[#E3F6FF] border p-5 rounded-lg m-4  md:px-8 lg:px-20 md:py-10 py-8"
            id="Doing"
            onDragOver={(e) => onDragOver(e, "Doing")} // Pass the target ID to onDragOver
            onDrop={(e) => onDrop(e, "Doing")} // Pass the target ID to onDrop
            >
            <p className="text-3xl font-bold pb-2">Doing</p>



            {userDataDict[workSpace]?.Doing?.AllWorks.map((work, index) => (
                <div key={index} className="flex items-center justify-center">
                
                <button
                className="flex text-2xl font-semibold text-white bg-[#3330E4] items-center border  pl-3 pr-3 py-4 rounded-lg my-2  border-solid"
                    key={index}
                    draggable="true"
                    onDragStart={(e) => onDragStart(e, userDataDict[workSpace]?.Doing[work], work, "Doing")}
                    onClick={(e)=>{
                        // console.error("im clicked");

                        showDoingEventDetails(e, work, "Doing");
                        }}
                >
                {work}
                    <CiEdit className="flex ml-2"/>
                </button>
                
                </div>

                ))}




                <div className="flex justify-center">

                <button
                className="flex items-center border text-3xl text-white bg-[#27005D] border-black pl-2 pr-2 py-1 rounded-lg my-2  border-solid"
                    
                    // draggable="true"
                    // onDragStart={(e) => onDragStart(e, userDataDict[workSpace]?.ToDo[work], work, "ToDo")}
                    onClick={(e)=>{
                        // console.error("im clicked");
                        setShowDoingEventModal(true);
                        // showToDoEventDetails(e, work, "ToDo");
                        }}
                >+</button>
                </div>

                {showDoingEventModal && (
                    <div className="modal-overlay">
                    <div className="bg-white border border-black rounded-2xl w-fit p-5">
                <DisplayEvent
                    eventName={""}
                    workSpace={workSpace}
                    type={"Doing"}
                    eventData={ {"status":"", "description" : "", "startDate" : "01-01-2023", "deadLine" : "01-01-2023"}}
                    />
                    <button className="p-2   mx-5 rounded-lg font-semibold bg-red-400" onClick={closeDoingEventDetails}>Close</button>
                </div>
                </div>

                )}











                {selectedDoingEvent && ( <>
                    {/* <div className="fixed w-full min-h-screen z-50 bg-black opacity-30" /> */}
                    <div className="modal-overlay">
                    <div className="bg-white border border-black rounded-2xl w-fit p-5">
               <DisplayEvent
                    eventName={selectedDoingEvent.eventName}
                    workSpace={workSpace}
                    type={selectedDoingEvent.eventType}
                    eventData={userDataDict[workSpace]?.[selectedDoingEvent.eventType][selectedDoingEvent.eventName]}
                    />
                    <button className="p-2  mx-5 rounded-lg font-semibold bg-red-400" onClick={closeDoingEventDetails}>Close</button>
                    <button className="p-2  mx-5 rounded-lg font-semibold bg-red-400" onClick={(e)=>deleteEvent(e, workSpace, selectedDoingEvent.eventType, selectedDoingEvent.eventName)}>Delete</button>
                </div>
                </div>
                </>
                


                )}



                {/* <p key={index}>{work}</p> */}

            {/* {userDataDict[workSpace]?.Doing?.AllWorks.map((work, index) => (
                <DisplayEvent id="DoingWorks" key={index} eventName={work} workSpace={workSpace} type="Doing" eventData={userDataDict[workSpace]?.Doing[work]} />
                ))} */}
            
            {/* <p>{userDataDict?.WorkSpace0?.Doing?.AllWorks[0]}</p> */}
          </div>

          <div
           className="bg-[#E3F6FF] border p-5 rounded-lg m-4   md:px-8 lg:px-20 md:py-10 py-8"
            id="Done"
            onDragOver={(e) => onDragOver(e, "Done")} // Pass the target ID to onDragOver
            onDrop={(e) => onDrop(e, "Done")} // Pass the target ID to onDrop
            >
            <p className="text-3xl font-bold pb-2">Done</p>

            {userDataDict[workSpace]?.Done?.AllWorks.map((work, index) => (
                <div key={index} className="flex items-center justify-center">
                
                <button
                className="flex text-2xl font-semibold text-white bg-[#3330E4] items-center border  pl-3 pr-3 py-4 rounded-lg my-2  border-solid"
                    key={index}
                    draggable="true"
                    onDragStart={(e) => onDragStart(e, userDataDict[workSpace]?.Done[work], work, "Done")}
                    onClick={(e)=>{
                    // console.error("im clicked");

                        showDoneEventDetails(e, work, "Done");
                        }}
                >
                    {work}
                    <CiEdit className="flex ml-2"/>
                </button>
                
                </div>
                ))}



                <div className="flex justify-center">

                <button
                className="flex items-center border text-3xl text-white bg-[#27005D] border-black pl-2 pr-2 py-1 rounded-lg my-2  border-solid"
                    
                    // draggable="true"
                    // onDragStart={(e) => onDragStart(e, userDataDict[workSpace]?.ToDo[work], work, "ToDo")}
                    onClick={(e)=>{
                        // console.error("im clicked");
                        setShowDoneEventModal(true);
                        // showToDoEventDetails(e, work, "ToDo");
                        }}
                >+</button>
                </div>

                {showDoneEventModal && (
                    <div className="modal-overlay">
                    <div className="bg-white border border-black rounded-2xl w-fit p-5">
                <DisplayEvent
                    eventName={""}
                    workSpace={workSpace}
                    type="Done"
                    eventData={ {"status":"", "description" : "", "startDate" : "01-01-2023", "deadLine" : "01-01-2023"}}
                    />
                    <button className="p-2  mx-5 rounded-lg font-semibold bg-red-400" onClick={closeDoneEventDetails}>Close</button>
                </div>
                </div>

                )}








                {selectedDoneEvent && (
                    <div className="modal-overlay">
                    <div className="bg-white border border-black rounded-2xl w-fit p-5">
               

                <DisplayEvent
                    eventName={selectedDoneEvent.eventName}
                    workSpace={workSpace}
                    type={selectedDoneEvent.eventType}
                    eventData={userDataDict[workSpace]?.[selectedDoneEvent.eventType][selectedDoneEvent.eventName]}
                    />
                    <button className="p-2  mx-5 rounded-lg font-semibold bg-red-400" onClick={closeDoneEventDetails}>Close</button>
                    <button className="p-2  mx-5 rounded-lg font-semibold bg-red-400" onClick={(e)=>deleteEvent(e, workSpace, selectedDoneEvent.eventType, selectedDoneEvent.eventName)}>Delete</button>
                </div>
                </div>


                )}



                {/* <p key={index}>{work}</p> */}

            {/* {userDataDict[workSpace]?.Done?.AllWorks.map((work, index) => (
                <DisplayEvent id="DoneWorks" key={index} eventName={work} workSpace={workSpace} type="Done" eventData={userDataDict[workSpace]?.Done[work]} />
                
                
                ))} */}

            
            {/* <p>{userDataDict?.WorkSpace0?.Doing?.AllWorks[0]}</p> */}
          </div>

        </div>
      </div>





      <div className={"absolute  w-full "+(bgColor)}>

      <Footer />
      </div>

    </>
  );
}
