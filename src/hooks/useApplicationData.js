import React, {useEffect, useReducer } from 'react';
import axios from "axios";
import {reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
    const [state, dispatch] = useReducer(reducer, {
        day:"Monday",
        days:[],
        appointments: {},
        interviewers: {},
    })
    //counts the available spots for the selected day:
    const spotCounter = (id, flag) => {
      let targetDay = state.days.filter(weekday => weekday.appointments.includes(id))
      const dayId = targetDay[0] && targetDay[0].id
      let newSpots = state.days[dayId - 1].spots

      if(flag && state.appointments[id].interview === null) {
        newSpots -- ;
      } else if (!flag) {
        newSpots++;
      }

      return state.days.map(day => {
        if(day.id !== dayId) {
          return day;
        } return {
          ...day,
          spots:newSpots,
        }
      })
    } 
    //Dispatches the book interview command to the reducer:
    function bookInterview(id, interview) {

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        } 
        
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }; 

        const days = spotCounter(id, true);

        return (axios.put(`/api/appointments/${id}`, appointment))
        .then(() => {
          dispatch({type: SET_INTERVIEW, id, interview, appointments, days});
        })

    }
    //Dispatches the cancel interview command to the reducer:
    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      } 
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }; 

      const days = spotCounter(id, false)

     return (axios.delete(`/api/appointments/${id}`))
     .then(() => {
      dispatch({type: SET_INTERVIEW, id, interview:null, days, appointments});
     })
    }

    const setDay = day => dispatch({type: SET_DAY, day});
    
    useEffect(() => {
        const daysPromise = axios.get('/api/days')
        const appointmentsPromise = axios.get('/api/appointments') 
        const interviewersPromise = axios.get('/api/interviewers')  
        
        Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
        .then(([daysRes, appRes, intRes]) => {
          dispatch({type: SET_APPLICATION_DATA, days:daysRes.data, appointments:appRes.data, interviewers:intRes.data})

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
