"use client";
import { Card, Button } from "antd";

const MandateurCard = ({ mandateur }) => {
  return (
    <Card title={`${mandateur.nom} ${mandateur.prenom}`} style={{ width: 300, margin: 10 }}>
      <p><strong>Téléphone:</strong> {mandateur.numTelephone}</p>
      <p><strong>Port:</strong> {mandateur.port?.matricule}</p>
    </Card>
  );
};

export default MandateurCard;
