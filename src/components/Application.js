import React, { useState, useEffect } from "react";
import DayList from './DayList'
import Appointment from "./appointment" 
import "./Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"
const axios = require('axios');

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();


  const interviewersArray = getInterviewersForDay(state, state.day)

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    // const interview = getInterview(state, appointment.interview)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewersArray}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


  // useEffect(() => {
  //   const result1 = axios.get('http://localhost:8008/api/days')
  //   const result2 = axios.get('http://localhost:8008/api/appointments') 
  //   const result3 = axios.get('http://localhost:8008/api/interviewers')  
    
  //   Promise.all([result1, result2, result3])
  //   .then((all) => {
  //     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  //     })

  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  // }, [])


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">

  <DayList
   days={state.days}//
   day={state.day}//
   setDay={setDay}//
  />
  
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">

      {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
