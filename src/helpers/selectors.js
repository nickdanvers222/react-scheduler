import React from 'react';
//review

export function getAppointmentsForDay(state, day) {
    if (state.days.length === 0) {
      return [];
    }
    const filteredDays = state.days.filter(weekday => weekday.name === day)
    if (filteredDays.length === 0) {
      return [];
    }
    const appointmentKeys = Object.keys(state.appointments);
    const results = [];
    for (let key of appointmentKeys) {
      if (filteredDays[0].appointments.includes(Number(key))) {
        results.push(state.appointments[key])
      }
    }
    return results;
  }


export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const filteredDays = state.days.filter(weekday => weekday.name === day)
  if (filteredDays.length === 0) {
    return [];
  }
  const interviewersKeys = Object.keys(state.interviewers);
  const results = [];
  for (let key of interviewersKeys) {
    if (filteredDays[0].interviewers.includes(Number(key))) {
      results.push(state.interviewers[key])
    }
  }
  console.log(results)
  return results;
  
}



export function getInterview(state, interview){
    let results = {};

    if(!interview) {
        return null;
    }
    
    results["student"] = interview.student;
    const keys = Object.keys(state.interviewers);
    for (let key of keys) {
     if (Number(key) === interview.interviewer) {
        results['interviewer'] = state.interviewers[key]
            
     } 

    }
    return results;

}



//   {  
//     "student": "Lydia Miller-Jones",
//     "interviewer": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     }
//   }