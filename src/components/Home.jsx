import axios from "axios";
import { useState, useEffect } from "react";
import DisplayEvent from "./DisplayEvent";
import { json } from "react-router-dom";
import {CiEdit} from 'react-icons/ci'

import "../App.css"
import LoadingScreen from "./Loader";

export default function Home() {


  const severPath = "https://servetasker.onrender.com"
  // const severPath = "http://127.0.0.1:5000";
  const collectionName = "geddadavenkatapradeep";

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




      <div>
        <p>Home</p>
      </div>



      <div className="flex justify-center">
        <div className="w-1/2">
          <div
           className=" border p-5 rounded-lg m-4 border-black"
            id="ToDo"
            onDragOver={(e) => onDragOver(e, "ToDo")} // Pass the target ID to onDragOver
            onDrop={(e) => onDrop(e, "ToDo")} // Pass the target ID to onDrop
            >
            <p>ToDo</p>


            {userDataDict[workSpace]?.ToDo?.AllWorks.map((work, index) => (
                
                <div key={index} className="flex items-center justify-center">
                <button
                className="flex items-center border border-black pl-2 pr-2 py-2 rounded-lg my-2  border-solid"
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
                className="flex items-center border border-black pl-2 pr-2 py-1 rounded-lg my-2  border-solid"
                    
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
                    <button className="p-2 bg-red-400" onClick={closeToDoEventDetails}>Close</button>

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
                    <button className="p-2 bg-red-400" onClick={closeToDoEventDetails}>Close</button>
                    <button className="p-2 bg-red-400" onClick={(e)=>deleteEvent(e, workSpace, selectedToDoEvent.eventType, selectedToDoEvent.eventName)}>Delete</button>
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
           className="border p-5 rounded-lg m-4 border-black"
            id="Doing"
            onDragOver={(e) => onDragOver(e, "Doing")} // Pass the target ID to onDragOver
            onDrop={(e) => onDrop(e, "Doing")} // Pass the target ID to onDrop
            >
            <p>Doing</p>



            {userDataDict[workSpace]?.Doing?.AllWorks.map((work, index) => (
                <div key={index} className="flex items-center justify-center">
                
                <button
                className="flex items-center border border-black pl-2 pr-2 py-2 rounded-lg my-2 border-solid"
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
                className="flex items-center border border-black pl-2 pr-2 py-1 rounded-lg my-2  border-solid"
                    
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
                    <button className="p-2 bg-red-400" onClick={closeDoingEventDetails}>Close</button>
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
                    <button className="p-2 bg-red-400" onClick={closeDoingEventDetails}>Close</button>
                    <button className="p-2 bg-red-400" onClick={(e)=>deleteEvent(e, workSpace, selectedDoingEvent.eventType, selectedDoingEvent.eventName)}>Delete</button>
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
           className="border p-5 rounded-lg m-4 border-black"
            id="Done"
            onDragOver={(e) => onDragOver(e, "Done")} // Pass the target ID to onDragOver
            onDrop={(e) => onDrop(e, "Done")} // Pass the target ID to onDrop
            >
            <p>Done</p>

            {userDataDict[workSpace]?.Done?.AllWorks.map((work, index) => (
                <div key={index} className="flex items-center justify-center">
                
                <button
                className="flex items-center border border-black pl-2 pr-2 py-2 rounded-lg my-2 b border-solid"
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
                className="flex items-center border border-black pl-2 pr-2 py-1 rounded-lg my-2  border-solid"
                    
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
                    <button className="p-2 bg-red-400" onClick={closeDoneEventDetails}>Close</button>
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
                    <button className="p-2 bg-red-400" onClick={closeDoneEventDetails}>Close</button>
                    <button className="p-2 bg-red-400" onClick={(e)=>deleteEvent(e, workSpace, selectedDoneEvent.eventType, selectedDoneEvent.eventName)}>Delete</button>
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
    </>
  );
}
