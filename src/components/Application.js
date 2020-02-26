import React from "react";
import DayList from './DayList'
import Appointment from "./appointment" 
import "./Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  //Retrieve Array of possible Interviewers
  const interviewersArray = getInterviewersForDay(state, state.day)
  
  //Retrieve Array of appointments for the selected day
  const appointments = getAppointmentsForDay(state, state.day);

  //Map each interview from the appointments array
  const schedule = appointments.map((appointment) => {
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
