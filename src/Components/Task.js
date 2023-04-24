import Task2 from "./Task2"
// import Button from "./Button"
// import { useLocation } from "react-router"

const Task = ({tasks,onDelete,onToggle,onEdit,onEdit2,showTask,newData,myid,setText,setTime,setDate,setDescription,text,time,Date,Description,Reminder, setReminder}) => {
// console.log(newData,"task")
//  console.log("helllllllooooooo",newData);
// const location=useLocation()
  return (
    <>

    

       {/* {console.log("this task",tasks)} */}
    {
     tasks.map((task,index)=>(
     
    <Task2 key={index} task={task}
     onDelete={onDelete} onToggle={onToggle} onEdit2={onEdit2} onEdit={onEdit} showTask={showTask}  newData={newData} myid={myid}  setText={setText} setTime={setTime} setDate={setDate} setDescription={setDescription} text={text} Date={Date}  Reminder={Reminder} setReminder={setReminder} time={time} Description={Description}/>
     
    
     ))}
    
    



    
    
    </>
  )
}

export default Task