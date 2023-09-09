import { useState,useEffect } from "react"
import axios from "axios";
import { useActionData } from "react-router-dom";

export default function DisplayEvent(props){

    // const severPath = "https://servetasker.onrender.com"
      const severPath = "http://127.0.0.1:5000"; 
      const collectionName = localStorage.getItem("collectionName");

const [showCard, setshowCard] = useState(true)


const [eventName, seteventName] = useState(props.eventName)
const [startDate, setstartDate] = useState(props.eventData["startDate"])
const [deadLine, setdeadLine] = useState(props.eventData["deadLine"])
const [description, setdescription] = useState(props.eventData["description"])
const [eventStatus, seteventStatus] = useState(props.eventData["status"])


useEffect(() => {
    // Convert ISO date format to "DD-MM-YYYY" format for display
    const formattedStartDate = startDate.split("-").reverse().join("-");
    const formattedDeadLineDate = deadLine.split("-").reverse().join("-");

    setstartDate(formattedStartDate);
    setdeadLine(formattedDeadLineDate);

  }, []);



const changeCard=(e)=>{
    e.preventDefault()
    setshowCard(!showCard)
}


const [editable, setEditable] = useState(true);



const handleDateChange = (e) => {
    const formattedStartDate = e.target.value;
    // console.warn(formattedStartDate)
    // Convert "DD-MM-YYYY" format to ISO date format for storage
    // const isoStartDate = formattedStartDate.split("-").reverse().join("-");
    // console.warn(isoStartDate);
    setstartDate(formattedStartDate);
  };

const handleDeadLineChange = (e) =>{
    const formattedDeadLineDate = e.target.value
    setdeadLine(formattedDeadLineDate)
}



const onDragStart = (e) => {
    // Store the event data for dragging
    console.warn("dragging started")
    e.dataTransfer.setData("text/plain", JSON.stringify(props.eventData));
  };

  const onDragOver = (e) => {
    // Prevent the default behavior to allow dropping
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    // Get the event data from the data transfer
    const eventData = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.warn("Dropped Event:", eventData);
    const dropTargetId = e.target.id; // Get the ID or other attribute of the drop target div
    console.warn("Drop Target ID:", dropTargetId);
    // Handle the dropped event data here as needed
  };



const UpdateEventData = async(e) => {
    e.preventDefault()

    const data = {
        "collectionName" : collectionName,
        "WorkSpace" : props.workSpace,
        "type" : props.type,
        "workName" : props.eventName,
        "updatedWorkName" : eventName, 
        "updatedData" : {
            "status":eventStatus,
            "description" : description,
            "startDate" : startDate.split("-").reverse().join("-"),
            "deadLine" : deadLine.split("-").reverse().join("-")
        }
    }
    const response = await axios.post(severPath+"/updateEventData", data)
    console.warn(response.data)
    // setshowCard(false)
}






    return(
        <>

        


        {/* <div
            draggable="true"
             onDragStart={onDragStart}
             onDragOver={onDragOver}
             onDrop={onDrop}
             >

            <button
             className=" border border-black pl-2 pr-10 py-2 rounded-l-lg my-2 border-r-0 border-solid"
             onClick={changeCard}
             
             
             >{props.eventName}</button>
        </div> */}



            <div className={showCard ? "":"hidden"}>

            <div className="">

                <form onSubmit={UpdateEventData}>

                    <div className="py-2">
                        <label>Event Name : &nbsp;</label>
                        <input 
                            className="px-1 border border-black"
                            placeholder="Event Name"
                            type="text"
                            contentEditable
                            value={eventName}
                            onChange={(e) => {seteventName(e.target.value)}}
                            ></input>
                    </div>


                    <div className="flex py2">
                    <label>Start Date : &nbsp;</label>

                        <input 
                            className=" pl-2"
                            type="date"
                            contentEditable
                            value={startDate}
                            onChange={handleDateChange}
                            ></input>
                    </div>

                    <div className="flex py-2">
                    <label>End Date : &nbsp;</label>

                        <input 
                            className="pl-2"
                            type="date"
                            contentEditable
                            value={deadLine}
                            onChange={handleDeadLineChange}
                            ></input>
                    </div>

                    <div  className="flex items-start py-2">
                    <div  className="flex-col items-start">
                    <label>Description : &nbsp;</label>
                    </div>
                        <textarea
                            className="border border-black ml-1 p-1"
                            type="text"
                            placeholder="Describe"
                            value={description}
                            onChange={(e) => {setdescription(e.target.value)}}
                            ></textarea>
                    </div>


                    <div className="flex items-start py-2">
                    <label>Status : &nbsp;</label>

                        <input 
                            className="px-1 border border-black"
                            type="text"
                            placeholder="Set Status"
                            contentEditable
                            value={eventStatus}
                            onChange={(e) => {seteventStatus(e.target.value)}}
                            ></input>
                    </div>
                    

                    

                    <button type="submit" className="p-2 my-5 rounded-lg font-semibold bg-blue-400">Submit</button>

                </form>

                {/* <p>{startDate}</p>
                <p>{deadLine}</p>
                <p>{description}</p>
                <p>{status}</p> */}
            </div>
        </div>


        </>
    )
}