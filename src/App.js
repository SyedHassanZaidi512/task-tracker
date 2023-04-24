import Header from "./Components/Header"
import Task from "./Components/Task";
import Addtask from "./Components/Addtask";
import Footer from "./Components/Footer";
import { useState,useEffect } from "react";
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom"
import './App.css'; 
import Button from './Components/Button.js'
import About from "./Components/About";
import Edittasks from "./Components/Edittasks";
import moment from 'moment'

// import { useLocation } from "react-router"; 


function App() 
{   
  
  const [showAddTask, setshowAddTask] = useState(false)
  const [showTask, setshowTask] = useState(true)
  const [tasks, settasks] = useState([])
  const[newData,setnewData]=useState()
  const [myId, setmyId] = useState("")
  // const [showTask, setshowTask] = useState(false)
  const [text, setText] = useState()
  const [Date, setDate] = useState(moment().format("MMM Do YY"))
  const [time, setTime] = useState(moment().format('h:mm:ss a'))
  const [Description, setDescription] = useState("")
  const [Reminder, setReminder] = useState(false)

  

 
 useEffect(()=>{
   
  const getTasks=async () =>{
    const taskFromSever= await fetchTasks()
    settasks(taskFromSever)
  //  console.log("eweewe",newData);
  }
  
  getTasks()
   
 },[newData])

//fetch tasks

const fetchTasks=async()=>{
  const res= await fetch('http://localhost:5000/tasks')
  const data =await res.json()
  return data
}

 //fetch task

 const fetchTask=async(id)=>{
  const res= await fetch(`http://localhost:5000/tasks/${id}`)
  const data =await res.json()
  return data
}


//add task
const Addtaskfunc=async (task)=>
{    console.log("all tasks are",task)
    const res=await fetch (`http://localhost:5000/tasks`,{'method':'POST',headers:{'Content-type':'application/json',},body:JSON.stringify(task),})
    const data=await res.json()
    settasks([...tasks,data])


//  const id=Math.floor(Math.random() * 10000)+1;
//  const newTask = {id,...task}
//  settasks([...tasks,newTask])

}

const getEdit=async(task)=>
{

  const taskToEdit= await fetchTask(myId)
  // const  udpTask= {...task.data}
  // console.log(udpTask)
  const res=await fetch (`http://localhost:5000/tasks/${myId}`,{'method':'PUT',headers:{'Content-type':'application/json',},body:JSON.stringify(task),})
  const data=await res.json()
  console.log(data)
  settasks(tasks.map((task)=>task.id===myId?{...task.data}:tasks))
 
}

const Editaskfunc=async (id)=>
{  
   setmyId(id)
  const taskToEdit= await fetchTask(id)
  console.log(newData)
   setText(taskToEdit.text)
   setDescription(taskToEdit.Description)
  // showingtask()
  
  // getEdit()
   

  
}

const showingtask=async (id)=>
{  
  const taskToToggle= await fetchTask(id)
  const  udpTask= {...taskToToggle,showTask:!taskToToggle.showAddTask}
  const res=await fetch (`http://localhost:5000/tasks/${id}`,{'method':'PUT',headers:{'Content-type':'application/json',},body:JSON.stringify(udpTask),})
  const data=await res.json()
   settasks(tasks.map((task)=>task.id===id?{...task,showTask:data.showTask}:task))
  
}
const deleteTask=async(id)=>
{    
    await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'})

    settasks(tasks.filter((task)=>task.id !==id))
}

//toggle reminder

const togglereminder=async (id)=>
{  
  const taskToToggle= await fetchTask(id)
  const  udpTask= {...taskToToggle,reminder:!taskToToggle.reminder}
  const res=await fetch (`http://localhost:5000/tasks/${id}`,{'method':'PUT',headers:{'Content-type':'application/json',},body:JSON.stringify(udpTask),})
  const data=await res.json()
   settasks(tasks.map((task)=>task.id===id?{...task,reminder:data.reminder}:task))
  
}


  return (
    <Router>
    

    <div className="container" >
    
      <Header title="Task Tracker"/> 
      
     
      <Routes>     
      <Route
            path='/'
            element={
              <>
                 {<Button color={showAddTask ?"red":"green"} text={showAddTask ? 'close' :"Add"} onClick={()=>setshowAddTask(!showAddTask)}/>}
                 {showAddTask && 
                  <Addtask 
                    onAdd={Addtaskfunc}
                    editData={newData}
                     />}
                {tasks.length > 0 ? (
                  <Task
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={togglereminder}
                    onEdit={Editaskfunc}
                    showAddtask={showAddTask}
                  />
                ) : (
                      'No Tasks To Show'
                )}
              </>
            }
          />  
           
           <Route path='/task' element={
                <>
                    {tasks.length > 0 ? (
                         <Task
                           tasks={tasks}
                           onDelete={deleteTask}
                           onToggle={togglereminder}
                           onEdit={Editaskfunc}
                           myid={myId}
                          newData={newData}
                          showTask={showTask}
                          onEdit2={getEdit}
                          setText={setText} setTime={setTime} setDescription={setDescription} setDate={setDate} time={time} text={text} Date={Date}
                          Reminder={Reminder} Description={Description} setReminder={setReminder} 
                         />
                       ) : (
                         'No Tasks To Show'
                       )}  
                         

                </>
              }/>
              
             <Route  path='/about' element={<About/>}/> 

      </Routes>
      <Footer/>
      
 
      
         
    </div>
    
    </Router>   
  )   
    
    
  
}

export default App;
