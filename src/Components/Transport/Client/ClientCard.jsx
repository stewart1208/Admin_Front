import { Card } from "antd";
import Link from "next/link";

const ClientCard = ({ client }) => {
  return (
    <Link href={`/transport/client/${client.id}`} passHref>
    <Card
      title={`${client.nom} ${client.prenom}`}
      style={{ width: 300, marginBottom: 16 }}
    >
      <p><strong>Téléphone:</strong> {client.numTelephone}</p>
      <p><strong>Wilaya:</strong> {client.wilaya}</p>
      <p><strong>Daïra:</strong> {client.dayra}</p>      
    </Card>
    </Link>
  );
};

export default ClientCard;
