import { Card, Tag } from "antd";
import Link from "next/link";

const LocationCard = ({ location }) => {
  return (
    <Link href={`/transport/location/${location.id}`}>
      <Card
        title={`Location - ${new Date(location.date).toLocaleDateString()}`}
        style={{ marginBottom: 16 }}
        hoverable
      >
        <p><strong>Client:</strong> {location.client.nom} {location.client.prenom}</p>
        <p><strong>Navire:</strong> {location.navire.nom} ({location.navire.matricule})</p>
        <p><strong>Port:</strong> {location.port.commune}, {location.port.dayra}</p>
        <Tag color="blue">Prix d'allocation: {location.navire.prix} DA</Tag>
      </Card>
    </Link>
  );
};

export default LocationCard;
