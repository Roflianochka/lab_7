import data from "../jsons/EmployeesData.json";
import React, { useState, useEffect } from "react";
import EmployeesItem from "../pages/EmployeesItem";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Employees = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phone: "",
    hourlyRate: "",
  });
  useEffect(() => {
    dispatch({ type: "SET_EMPLOYEES", payload: data });
  }, [dispatch]);

  const handleDeleteEmployee = (employeeId) => {
    dispatch({ type: "DELETE_EMPLOYEE", payload: employeeId });
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    dispatch({ type: "UPDATE_EMPLOYEE", payload: updatedEmployee });
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewEmployee({
      id: null,
      firstName: "",
      lastName: "",
      phone: "",
      hourlyRate: "",
    });
  };

  const handleAddEmployee = () => {
    const newId = employees.length + 1;
    dispatch({
      type: "ADD_EMPLOYEE",
      payload: { ...newEmployee, id: newId },
    });
    handleCloseAddModal();
  };

  return (
    <>
      <div className="equipmentPage-container">
        {employees.map((employee) => (
          <EmployeesItem
            key={employee.id}
            employee={employee}
            onDelete={handleDeleteEmployee}
            onUpdate={handleUpdateEmployee}
          />
        ))}
        <Button variant="success" className="mb-3" onClick={handleShowAddModal}>
          Добавить работника
        </Button>
        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить работника</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите имя"
                  value={newEmployee.firstName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      firstName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите фамилию"
                  value={newEmployee.lastName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      lastName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Телефон</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите номер телефона"
                  value={newEmployee.phone}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      phone: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Часовая оплата</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите часовую оплату"
                  value={newEmployee.hourlyRate}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      hourlyRate: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleAddEmployee}>
              Добавить работника
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Employees;
