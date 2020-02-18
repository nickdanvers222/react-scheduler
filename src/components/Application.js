import React, { useState, useEffect } from "react";
import DayList from './DayList'
import Appointment from "./appointment" 
import "./Application.scss";
import InterviewerList from "./InterviewerList";

const axios = require('axios');


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "11am",
    interview: {
      student: "Nick Rogers",
      interviewer: {
        id: 1,
        name: "Lydia Something",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    } 
  },
  {
    id: 2,
    time: "12:30pm",
    interview: {
      student: "Roe Jogan",
      interviewer: {
        id: 1,
        name: "Wornell Crest",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    } 
  },

];



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    axios.get('http://localhost:8008/api/days')
      
  .then(function (response) {
    
    setDays(response.data)//setState({...state, days: response.data})
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  }, [])


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
      {appointments.map(appointment => {
        return <Appointment
          key={appointments.id}
          {...appointment}
        />
      })}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
