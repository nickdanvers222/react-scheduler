import React, { useState, useEffect, useReducer } from 'react';
import { actions } from '@storybook/addon-actions/dist/preview';
import useVisualMode from "./useVisualMode"
const axios = require('axios')

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SHOW = "SHOW";
const EMPTY = "EMPTY";


function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day:action.day}
    case SET_APPLICATION_DATA:
      console.log('set app data', action.days)
      return {...state, days: [...action.days], appointments:action.appointments, interviewers:action.interviewers }
    case SET_INTERVIEW: {
      const { appointments, interview, days } = action
      console.log('set interview', days)
      return interview ?  {...state, appointments, days} : {...state, days, appointments};
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    }
  }

  //Set interview -> id of interview && interviewer
  //state dependent should stay within the reducer
  //pull spotsCounter out of the useAppData
// remove useRef
//  
  
  export default function useApplicationData() {
    const [state, dispatch] = useReducer(reducer, {
      day:"Monday",
      days:[],
      appointments: {},
      interviewers: {},
    })
    const { mode, transition, back } = useVisualMode(
    );

    console.log('rerender', state.days);

    const spotCounter = (id, flag) => {
      console.log('spots counter', id, flag, state.days)
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
        console.log('after socket update, ', id, state.days)
        const days = spotCounter(id, true);

        return (axios.put(`/api/appointments/${id}`, appointment))
        .then(() => {
          console.log(interview, appointments,days);
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
    const setDay = day => dispatch({type: SET_DAY, day});

    useEffect(() => {
      const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      webSocket.onopen = function (event) {
              // webSocket.send("SET_INTERVIEWf"); 
      };
      //

      webSocket.onmessage = function (event) {
        console.log(event.data, state.days)
        const parsed = JSON.parse(event.data)
          if (parsed.type === "SET_INTERVIEW") { 

          const parsedInterview = parsed.interview
          // (dispatch)(bookinterview)(parsed.id, parsedInterview);
        }
      } 
      const daysPromise = axios.get('http://localhost:8001/api/days')
      const appointmentsPromise = axios.get('http://localhost:8001/api/appointments') 
      const interviewersPromise = axios.get('http://localhost:8001/api/interviewers')  

        Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
        .then(([daysRes, appRes, intRes]) => {
          // setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
          dispatch({type: SET_APPLICATION_DATA, days:daysRes.data, appointments:appRes.data, interviewers:intRes.data})

        })
    
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        return () => {
          //when the component is removed from the screen, this will run
          //clean up area / stop the web socket
        }
      }, [])

      useEffect(() => {
                //

                if (state.interview && mode === EMPTY) {
                  console.log("1st")
                  transition(SHOW);
                 }
                 if (state.interview === null && mode === SHOW) {
                  console.log("2st")
                  transition(EMPTY);
                 }
                
                //
      }, [state.interview, mode, transition])

    return ({
        state,
        setDay,
        bookInterview,
        cancelInterview,
    })

}
