import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

const UserProfileEditForm = ({ userData, onCancel, onSave, onInputChange }) => {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Никнейм</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={userData.username}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formFullName">
            <Form.Label>ФИО</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="fullName"
              value={userData.fullName}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBio">
            <Form.Label>О себе</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter bio"
              name="bio"
              value={userData.bio}
              onChange={onInputChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={onSave} className="mr-2">
            Сохранить
          </Button>{" "}
          <Button variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

const UserProfileDisplay = ({ userData, onEditClick }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Информация о пользователе</Card.Title>
        <p>
          <strong>Никнейм:</strong> {userData.username}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>ФИО:</strong> {userData.fullName}
        </p>
        <p>
          <strong>О себе:</strong> {userData.bio}
        </p>
        <Button variant="primary" onClick={onEditClick}>
          Изменить
        </Button>
      </Card.Body>
    </Card>
  );
};

const UserProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: "user123",
    email: "user@email.com",
    fullName: "Петров Петр Петрович",
    bio: "Стажер",
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          {editMode ? (
            <UserProfileEditForm
              userData={userData}
              onCancel={handleCancelClick}
              onSave={handleSaveClick}
              onInputChange={handleInputChange}
            />
          ) : (
            <UserProfileDisplay
              userData={userData}
              onEditClick={handleEditClick}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
