import axios from 'axios'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'

const Home = () => {
    const { state, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios
            .get("https://todo.paydali.uz/api/tasks", {
                headers: {
                    "Authorization": "Bearer " + state.token
                }
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                if(err.response.status === 401) {
                    navigate("/login", { replace: true })
                }
            })
    },[state])
  return (
    <div>Home</div>
  )
}

export default Home