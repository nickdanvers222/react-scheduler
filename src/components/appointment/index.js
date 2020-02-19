import React from 'react';
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM"


export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

    function save(name, interviewer) {
        transition(SAVING)

      const interview = {
        student: name,
        interviewer
      };

      props.bookInterview(props.id, interview).then(transition(SHOW))
    }


    const onAdd = () => {
     transition(CREATE)
    }
    const onCancel = () => {
     back()
    }
    const onDelete = () => {
    
     props.cancelInterview().then(transition(CONFIRM))
     
    }

    const deleteConfirm = () => {
     transition(DELETE);
     props.cancelInterview().then(transition(EMPTY))
    }

    return(

       
        <article className="appointment">
         <Header
          time={props.time} 
          />
        {mode === EMPTY && <Empty  onAdd={onAdd}/>}
        {mode === SHOW && (
            <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={onDelete}
            />
        )}
        {mode === CREATE && (
            <Form 
            interviewers={props.interviewers}
            onCancel={onCancel}
            onSave={save}
            />
        )}
        {mode === SAVING && (
            <Status 
            message={"Saving.."}
            />
        )}
        {mode === CONFIRM && (
            <Confirm
            message={"Are you sure you want to delete this?"}
             onDelete={deleteConfirm}
            />
        )}

        </article>
    );
}
