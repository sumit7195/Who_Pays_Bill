import React, { useState, useContext, useRef } from "react";
import { Button, Form, Alert } from "react-bootstrap";

import { MyContext } from "../context";

const Stage1 = () => {
  const textInput = useRef();
  const context = useContext(MyContext);
  const [error, setError] = useState([false, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = textInput.current.value;
    const validate = validateInput(value);

    if (validate) {
      //form is valid;

      setError([false, ""]);
      context.addPlayer(value);

      textInput.current.value = "";
    } else {
      console.log("error");
    }
  };

  const validateInput = (value) => {
    if (value === "") {
      setError([true, "Sorry , you need to add something"]);

      return false;
    }

    if (value.length <= 2) {
      setError([true, "Sorry, you need 3 char at least"]);
      return false;
    }

    return true;
  };

  //   console.log(context);

  return (
    <>
      <div class=" w-25 p-3">
        <Form onSubmit={handleSubmit} size="sm" className="mt-3">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Add player name"
              name="player"
              ref={textInput}
            />
          </Form.Group>

          {error[0] ? <Alert variant="danger">{error[1]}</Alert> : null}

          <Button className="mimai" variant="primary" type="submit">
            Add Player
          </Button>

          {context.state.players && context.state.players.length > 0 ? (
            <>
              <hr />
              <div>
                <ul className="list-group">
                  {context.state.players.map((item, idx) => (
                    <li key={idx} className="list-group d-flex justify-content-between align-items-center list-group-item-action">{item}

                   <span className="badge badge-danger" onClick={()=>  context.removePlayer(idx)  }>x</span>                    
                    
                    
                    </li>
                  ))}
                </ul>
              <div
              
              className=  "action_button"
              
              onClick={()=> context.next()}
              >

               NEXT

              </div>


              </div>
            </>
          ) : null}
        </Form>
      </div>
    </>
  );
};

export default Stage1;
