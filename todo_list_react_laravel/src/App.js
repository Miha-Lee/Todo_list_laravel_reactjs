import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <div className="d-flex justify-content-center align-items-center fullHeight">
      <Col md={6}>
        <Card />
      </Col>
    </div>
  );
}

export default App;
