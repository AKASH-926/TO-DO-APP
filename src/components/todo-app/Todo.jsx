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
        axios.get("http://localhost:8080/api").then((response) => {
            setdata([...response.data.todo])


        }).catch((error) => {
            console.log(error)
        })

    }, [reload])
    const handlepost = async () => {
        await axios.post("http://localhost:8080/api", task).then((response) => {
            setreaload(!reload)

        })
        settask({ ...task, work: "" })
    }

    const handledelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/${id}`).then((response) => {
            setreaload(!reload)
        }).catch((error) => {
            console.log(error)
        })
    }
    const handle_edit = async (id) => {
        await axios.get(`http://localhost:8080/api/${id}`).then((response) => {
            settask({ ...task, work: response.data.todo.work })
            setuid(id)
            settoggle(false)
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleupdate = async () => {
        await axios.put(`http://localhost:8080/api/${uid}`, task).then((response) => {
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
                <div id='input-wrapper'>
                    <input type="text" name="field" id="feild" value={task.work} onChange={(e) => {
                        settask({ ...task, work: e.target.value })
                    }} />
                    {toggle ? <button onClick={handlepost}>ADD</button> : <button onClick={handleupdate}>UPDATE</button>}
                </div>
                <div id='task-wrapper' >
                    <table>
                        <tbody>
                            {

                                data.map((value, i) => {
                                    return (
                                        <tr id='row-wrap' key={i}>
                                            <td id='task'>{value.work}</td>
                                            <td><button onClick={() => { handle_edit(value._id) }}>EDIT</button></td>
                                            <td><button onClick={() => { handledelete(value._id) }}>DELETE</button></td>
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
