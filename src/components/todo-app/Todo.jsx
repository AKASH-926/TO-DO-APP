import React from 'react'

import { useState } from 'react'
import axios from "axios"
import "./Todo.css"
import { useEffect } from 'react'
export default function Todo() {
    const [task, settask] = useState({ work: "" })
    const [data, setdata] = useState([])
    const [reload, setreaload] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:8080/api").then((response) => {
            setdata([...response.data.todo])


        }).catch((error) => {
            console.log(error)
        })

    }, [reload])
    const handlepost = async () => {
        await axios.post("http://localhost:8080/api", task).then((response) => {
            console.log(response)
            setreaload(!reload)
        })
    }

    const handledelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/${id}`).then((response) => {
            setreaload(!reload)
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleupdate = async (id) => {
        console.log(id)
    }

    return (
        <>
            <div>
                <div id='input-wrapper'>
                    <input type="text" name="field" id="feild" value={task.work} onChange={(e) => {
                        settask({ ...task, work: e.target.value })
                    }} />
                    <button onClick={handlepost}>ADD</button>
                </div>
                <div id='task-wrapper' >
                    <table>
                        <tbody>
                            {

                                data.map((value, i) => {
                                    return (
                                        <tr id='row-wrap' key={i}>
                                            <td id='task'>{value.work}</td>
                                            <td><button onClick={() => { handleupdate(value._id) }}>EDIT</button></td>
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
