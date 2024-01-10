import React, { useState, useEffect } from "react";
import data from "../jsons/CommisionsData.json";
import "../styles/Commisions.css";
import CommisionsItem from "./CommisionsItem";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Commisions = () => {
  const commissions = useSelector((state) => state.commissions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_COMMISSIONS", payload: data });
  }, [dispatch]);

  const handleMemberDelete = (commissionId, memberId) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = commission.members.filter(
          (member) => member.id !== memberId
        );

        if (updatedMembers.length === 0) {
          return null;
        }

        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    const filteredCommissions = updatedCommissions.filter(
      (commission) => commission !== null
    );

    dispatch({ type: "SET_COMMISSIONS", payload: filteredCommissions });
  };

  const handleCommissionAdd = () => {
    const newCommissionId = Math.max(...commissions.map((c) => c.id), 0) + 1;

    const newCommission = {
      id: newCommissionId,
      name: "New Commission",
      members: [],
    };

    dispatch({ type: "ADD_COMMISSION", payload: newCommission });
  };

  const handleMemberAdd = (commissionId, newMember) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = [...commission.members, newMember];
        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    dispatch({ type: "SET_COMMISSIONS", payload: updatedCommissions });
  };

  const handleMemberEdit = (commissionId, memberId, updatedMember) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = commission.members.map((member) =>
          member.id === memberId ? { ...member, ...updatedMember } : member
        );

        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    dispatch({ type: "SET_COMMISSIONS", payload: updatedCommissions });
  };

  return (
    <>
      <div className="commissions-container">
        {commissions.map((commission) => (
          <CommisionsItem
            key={commission.id}
            commission={commission}
            onMemberDelete={handleMemberDelete}
            onMemberAdd={handleMemberAdd}
            onMemberEdit={handleMemberEdit}
          />
        ))}
        <Button
          variant="success"
          className="mb-3"
          onClick={handleCommissionAdd}
        >
          Добавить комиссию
        </Button>
      </div>
    </>
  );
};

export default Commisions;
