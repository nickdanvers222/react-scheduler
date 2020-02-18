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