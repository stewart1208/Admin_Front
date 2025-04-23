import { Card } from "antd";
import Link from "next/link";

const ClientCard = ({ client }) => {
  return (
    <Link href={`/pecherie/client/${client.id}`} style={{ textDecoration: "none" }}>
      <Card
        title={`${client.nom} ${client.prenom}`}
        hoverable
        style={{ width: 300, margin: "10px" }}
      >
        <p><strong>📞 Téléphone:</strong> {client.numTelephone}</p>
      </Card>
    </Link>
  );
};

export default ClientCard;
