import { Card } from "antd";
import Link from "next/link";

const NavireCard = ({ navire }) => {
  return (
    <Link href={`/pecherie/navire/${navire.id}`} style={{ textDecoration: "none" }}>
      <Card
        title={navire.nom}
        hoverable
        style={{ width: 300, margin: "10px" }}
      >
        <p><strong>Matricule:</strong> {navire.port.matricule} {navire.matricule}</p>
        <p><strong>Propriétaire:</strong> {navire.proprietaire}</p>
      </Card>
    </Link>
  );
};

export default NavireCard;
