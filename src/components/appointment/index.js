import React from 'react';
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

    const onAdd = () => {
     transition(CREATE)
    }
    const onCancel = () => {
     back()
    }

    return(

        //Can I import it as a different name than its being exported
        // onClick? Transition function?
        // 
       
        <article className="appointment">
         <Header
          time={props.time} 
          />
        {mode === EMPTY && <Empty  onAdd={onAdd}/>}
        {mode === SHOW && (
            <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            />
        )}
        {mode === CREATE && (
            <Form 
            interviewers={props.interviewers}////
            onCancel={onCancel}
            />
        )}

        </article>
    );
}
