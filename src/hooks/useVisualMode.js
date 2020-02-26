import React,{ useState } from 'react'

export default function useVisualMode(initial) {
const [mode, setMode] = useState(initial);
const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
   (replace ? setHistory(history) : setHistory([...history, mode]))
   setHistory([...history, newMode])
   setMode(newMode);   
  }  

  function back() {
   let preHistory = history.slice(0, -1)
   setHistory(preHistory)
   history.length > 1 ? setMode(preHistory[preHistory.length - 1]) : setMode(history.toString())     
  }

  return { mode, transition, back }
  
}