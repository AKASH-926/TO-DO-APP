import React from 'react'

import { useState } from 'react'
import axios from "axios"
import "./Todo.css"
import { useEffect } from 'react'
export default function Todo() {
    const [task, settask] = useState({ work: "" })
    const [data, setdata] = useState([])
    const [toggle, settoggle] = useState(true)
    const [reload, setreaload] = useState(true)
    const [uid, setuid] = useState("")
    useEffect(() => {
        axios.get("https://todo-api-88p9.onrender.com/api").then((response) => {
            setdata([...response.data.todo])


        }).catch((error) => {
            console.log(error)
        })

    }, [reload])
    const handlepost = async () => {
        if (task.work === "") {
            return alert("ENTER THE TASK TO ADD")
        }
        await axios.post("https://todo-api-88p9.onrender.com/api", task).then((response) => {
            setreaload(!reload)

        })
        settask({ ...task, work: "" })
    }

    const handledelete = async (id) => {

        let confirm = (window.confirm("ARE YOU SURE?"))
        if (confirm == false) return
        await axios.delete(`https://todo-api-88p9.onrender.com/api/${id}`).then((response) => {
            setreaload(!reload)
        }).catch((error) => {
            console.log(error)
        })
    }
    const handle_edit = async (id) => {
        await axios.get(`https://todo-api-88p9.onrender.com/api/${id}`).then((response) => {
            settask({ ...task, work: response.data.todo.work })
            setuid(id)
            settoggle(false)
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleupdate = async () => {
        if (task.work === "") {
            return alert("EDITED TASK CANNOT BE EMPTY")
        }
        await axios.put(`https://todo-api-88p9.onrender.com/api/${uid}`, task).then((response) => {
            setreaload(!reload)
            settoggle(true)
            settask({ ...task, work: "" })
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <div>
                <div id='heading'>
                    <h1>TO-DO's</h1>
                </div>
                <div id='input-wrapper'>
                    <input placeholder='Enter your task here' type="text" name="field" id="feild" value={task.work} onChange={(e) => {
                        settask({ ...task, work: e.target.value })
                    }} />
                    {toggle ? <button className='task_butn' onClick={handlepost}><img src='/add.png' alt='edit' /></button> : <button className='task_butn' onClick={handleupdate}><img src='/update.png' alt='edit' /></button>}
                </div>
                <div id='task-wrapper' >
                    <table>
                        <tbody>
                            {

                                data.map((value, i) => {
                                    return (
                                        <tr id='row-wrap' key={i}>
                                            <td id='task'>{i + 1}. {value.work} <span id='date'> || Date- [{value.date.split("T")[0]}]</span> </td>
                                            <td className='butn'><button className='edit_delete_butn' onClick={() => { handle_edit(value._id) }}> <img src='/edit.png' alt='edit' /> </button></td>
                                            <td className='butn'><button className='edit_delete_butn' onClick={() => { handledelete(value._id) }}><img src='/delete.png' alt='edit' /></button></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>


                    </table>


                </div>
            </div>


        </>

    )
}
