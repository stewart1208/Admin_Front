import { Card } from "antd";
import Link from "next/link";

const ProductionCard = ({ production }) => {
  const etatStyle = {
    color: production.etat ? "green" : "red",
    fontWeight: "bold",
  };

  return (
    <Link href={`/production/${production.id}`} style={{ textDecoration: "none" }}>
      <Card title={`Navire : ${production.navire.nom} `} hoverable style={{ width: 300, margin: "10px" }}>
        <p><strong>UGP</strong> : {production.ugp.dayra}</p>
        <p><strong>Montant:</strong> {production.montant} DA</p>
        <p>
          <strong>État:</strong> <span style={etatStyle}>{production.etat ? "Réglé" : "Non Réglé"}</span>
        </p>
      </Card>
    </Link>
  );
};

export default ProductionCard;
