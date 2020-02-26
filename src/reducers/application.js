
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
console.log("Im the reducer")

 export function reducer(state, action) {
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
