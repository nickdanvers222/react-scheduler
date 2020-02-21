import React, { useState, useEffect, useReducer } from 'react';
import { actions } from '@storybook/addon-actions/dist/preview';
const axios = require('axios')

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";


function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day:action.day}
    case SET_APPLICATION_DATA:
      return {...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers }
    case SET_INTERVIEW: {
      const { appointments, interview, days } = action
      return interview ?  {...state, appointments, days} : {...state, days, appointments};
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


export default function useApplicationData() {
    const [state, dispatch] = useReducer(reducer, {
        day:"Monday",
        days:[],
        appointments: {},
        interviewers: {},
    })

    const spotCounter = (id, flag) => {
      let targetDay = state.days.filter(weekday => weekday.appointments.includes(id))
      const dayId = targetDay[0] && targetDay[0].id
      let newSpots = state.days[dayId - 1].spots

      if(flag && state.appointments[id].interview === null) {
        newSpots -- ;
      // } else if (flag && state.appointments[id].interview !== null) {
        // newSpots --;
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
    // const setDay = day => setState({ ...state, day });
    const setDay = day => dispatch({type: SET_DAY, day});

    useEffect(() => {
        const daysPromise = axios.get('http://localhost:8008/api/days')
        const appointmentsPromise = axios.get('http://localhost:8008/api/appointments') 
        const interviewersPromise = axios.get('http://localhost:8008/api/interviewers')  
        
        Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
        .then(([daysRes, appRes, intRes]) => {
          // setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
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
