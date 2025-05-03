"use client"
import React from "react";
import { Card, Tag} from "antd";
import Link from "next/link";

const UgpCard = ({ ugp }) => {
  return (
    <Link href={`/pecherie/ugp/${ugp.id}`} style={{ textDecoration: "none" }}>
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
    </Link>
  );
};

export default UgpCard;
