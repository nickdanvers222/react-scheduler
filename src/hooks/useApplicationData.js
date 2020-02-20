import React, { useState, useEffect } from 'react';
const axios = require('axios')

export default function useApplicationData() {
    const [state, setState] = useState({
        day:"Monday",
        days:[],
        appointments: {},
        interviewers: {},
    })

    function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        } 
        
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }; 
        
        return (axios.put(`/api/appointments/${id}`, appointment)
        .then(setState({...state, appointments})))
    
    }

    function cancelInterview(id) {
     return (axios.delete(`/api/appointments/${id}`))
    }
    const setDay = day => setState({ ...state, day });


    useEffect(() => {
        const result1 = axios.get('http://localhost:8008/api/days')
        const result2 = axios.get('http://localhost:8008/api/appointments') 
        const result3 = axios.get('http://localhost:8008/api/interviewers')  
        
        Promise.all([result1, result2, result3])
        .then((all) => {
          setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
          })
    
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      }, [])

    return ({
        state,
        setDay,
        bookInterview,
        cancelInterview,
    })

}