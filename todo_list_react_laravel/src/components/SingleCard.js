import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import api from "../api/api";

const SingleCard = ({ title, complete, deleteList, id, fetchTasks }) => {
  const [show, setShow] = useState(false);
  const [taskValue, setTaskValue] = useState(title);
  const [taskComplete, setTaskComplete] = useState(complete);
  const [error, setError] = useState(false);

  const updateTask = (id) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", taskValue);
    formData.append("complete", taskComplete);

    api
      .post(`/tasks/${id}`, formData)
      .then(({ data }) => {
        if (data.message) {
          setError(false);
          setShow(false);
          fetchTasks();
        }
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setError(true);
        }
      });
  };

  const toggleTask = () => {
    let completeNumber = 0;
    if (taskComplete === 0) {
      setTaskComplete(1);
      completeNumber = 1;
    } else {
      setTaskComplete(0);
      completeNumber = 0;
    }

    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("title", taskValue);
    formData.append("complete", completeNumber);

    api
      .post(`/tasks/${id}`, formData)
      .then(({ data }) => {
        if (data.message) {
          fetchTasks();
        }
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          console.log("toggle task error");
        }
      });
  };

  return (
    <>
      <li
        className={`single-list justify-content-between ${
          taskComplete === 1 ? "completed" : ""
        }`}
      >
        <div className="form-check paddingLeft0">
          <p className="form-check-label marginBottom0">{title}</p>
        </div>
        <div>
          <Button
            variant="info"
            onClick={() => {
              setShow(true);
            }}
          >
            Edit
          </Button>
          {taskComplete ? (
            <Button
              variant="success"
              className="leftSpace"
              onClick={() => toggleTask()}
            >
              Completed
            </Button>
          ) : (
            <Button
              variant="warning"
              className="leftSpace"
              onClick={() => toggleTask()}
            >
              In Progress
            </Button>
          )}
          <Button
            variant="danger"
            className="leftSpace"
            onClick={() => {
              deleteList(id);
            }}
          >
            Delete
          </Button>
        </div>
      </li>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Task"
            value={taskValue}
            onChange={(e) => {
              setTaskValue(e.target.value);
            }}
          />
          {error && <p className="mt-3 error-text">Please fill in the task</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              updateTask(id);
            }}
          >
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleCard;
