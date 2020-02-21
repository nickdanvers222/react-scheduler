import React from 'react';
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


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

      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE))
    }


    const onAdd = () => {
     transition(CREATE)
    }
    const onCancel = () => {
     back()
    }
  
    const onConfirm = () => {
        transition(CONFIRM)
    }

    const deleteConfirm = () => {
     transition(DELETE);
        console.log("after delete")

     props.cancelInterview(props.id)
     .then(response => transition(EMPTY))
     .catch(error =>   transition(ERROR_DELETE, true))

    }
    const onEdit = () => {
        
        transition(EDIT)

    }
    const onClose = () => {
        transition(SHOW)
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
            onDelete={onConfirm}
            onEdit={onEdit}///
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

        {mode === DELETE && (
            <Status 
            message={"Deleting.."}
            />
        )}

        {mode === CONFIRM && (
            <Confirm
            message={"Are you sure you want to delete this?"}
             onConfirm={deleteConfirm}
             onCancel={back}
            />
        )}

        {mode === EDIT && (
            <Form 
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            student={props.interview.student}
            onCancel={onCancel}
            onSave={save}

            />
        )}

        {mode === ERROR_SAVE && (
            <Error
            message={"Couldn't save"}
            onClose={onClose}

            />
        )}

        {mode === ERROR_DELETE && (
            <Error
            message={"Couldn't delete"}
            onClose={onClose}
            />
        )}

        </article>
    );
}
