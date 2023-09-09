

export default function(){
    return (
        <>
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
        </>
    )
}