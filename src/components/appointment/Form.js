import React, {useState} from 'react';
import InterviewerList from "../InterviewerList"
import Button from "../Button"


export default function Form(props) {
  const [name, setName] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
      setName("");
      setError("");
      setInterviewer(null)
    
    }
  const cancel = () => {
    reset();
    props.onCancel();

  }
  const validate = () => {
    if(name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer)

  }
    return(<main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off"
      onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          value={name} 
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Enter Student Name"
          data-testid="student-name-input"
          
        />

      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={()=> cancel()} danger>Cancel</Button>
        <Button onClick={() => validate()} confirm>Save</Button>
      </section>
    </section>
  </main>
    )
}