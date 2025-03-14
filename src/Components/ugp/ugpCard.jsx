"use client"
import React from "react";
import { Card, Tag, List } from "antd";

const UgpCard = ({ ugp }) => {
  return (
    <Card
      title={ugp.dayra + " - " + ugp.wilaya}
      style={{ width: 400, marginBottom: 16 }}
    >
      <p>
        <strong>Email:</strong> {ugp.email}
      </p>
      <p>
        <strong>Commission:</strong> {ugp.commission * 100}%
      </p>
      <p>
        <strong>État:</strong>{" "}
        {ugp.state ? <Tag color="green">Actif</Tag> : <Tag color="red">Bloqué</Tag>}
      </p>
    </Card>
  );
};

export default UgpCard;
