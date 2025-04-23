import { Card, Button, Tag } from "antd";
import Link from "next/link";

const ProprietaireCard = ({ proprietaire }) => {
  return (
    <Link href={`/transport/proprietaire/${proprietaire.id}`} passHref>
      <Card
        title={`${proprietaire.nom} ${proprietaire.prenom}`}
        extra={
          <Tag color={proprietaire.state ? "green" : "red"}>
            {proprietaire.state ? "Validé" : "Non Validé"}
          </Tag>
        }
        style={{ marginBottom: 16, cursor: "pointer" }}
        hoverable
      >
        <p><strong>Téléphone:</strong> {proprietaire.numTelephone}</p>
        <p><strong>Date de naissance:</strong> {new Date(proprietaire.dateDeNassence).toLocaleDateString()}</p>
      </Card>
    </Link>
  );
};

export default ProprietaireCard;
