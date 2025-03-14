"use client";
import { Card } from "antd";
import Link from "next/link";

const MandateurCard = ({ mandateur }) => {
  return (
    <Link href={`/mandateur/${mandateur.id}`} style={{ textDecoration: "none" }}>
    <Card title={`${mandateur.nom} ${mandateur.prenom}`} style={{ width: 300, margin: 10 }}>
      <p><strong>Téléphone:</strong> {mandateur.numTelephone}</p>
    </Card>
    </Link>
  );
};

export default MandateurCard;
