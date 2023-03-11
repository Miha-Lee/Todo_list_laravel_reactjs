import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import SingleCard from "./SingleCard";
import api from "../api/api";

const Card = () => {
  const [taskList, setTaskList] = useState([]);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState("");
  const [error, setError] = useState(false);

  const fetchTasks = async () => {
    const response = await api.get("/");
    setTaskList(response.data.products);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addList = () => {
    const formData = new FormData();

    formData.append("title", task);
    formData.append("complete", 0);

    api
      .post("/task_create", formData)
      .then(({ data }) => {
        if (data.message) {
          setError(false);
          setShow(false);
          setTask("");
          fetchTasks();
        }
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setError(true);
        }
      });
  };

  const deleteList = (id) => {
    api
      .delete(`tasks/${id}`)
      .then(({ data }) => {
        if (data.message) {
          fetchTasks();
        }
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          console.log("deleting task failed");
        }
      });
  };

  return (
    <>
      <div className="card px-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="card-title">Task Lists</h3>
            <Button
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              Add List
            </Button>
          </div>
          <div className="list-wrapper">
            {taskList.length !== 0 ? (
              <ul className="d-flex flex-column-reverse paddingLeft0">
                {taskList.map((task) => {
                  return (
                    <SingleCard
                      key={task.id}
                      {...task}
                      deleteList={deleteList}
                      fetchTasks={fetchTasks}
                    />
                  );
                })}
              </ul>
            ) : (
              <h4 className="text-center">
                There are no lists, please add your own list.
              </h4>
            )}
          </div>
        </div>
      </div>
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
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          {error && <p className="mt-3 error-text">Please fill in the task</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              addList();
            }}
          >
            Add List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Card;
