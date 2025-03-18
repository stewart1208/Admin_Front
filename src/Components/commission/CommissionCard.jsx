import { Card, Tag } from "antd";
import { useRouter } from "next/navigation";

const CommissionCard = ({ commission }) => {
  const router = useRouter();

  // Définition du style de l'état
  const etatStyle = {
    color: commission.etat ? "green" : "red",
    fontWeight: "bold",
  };

  return (
    <Card
      title={`Semestre :${commission.semestre}`}
      hoverable
      onClick={() => router.push(`/commission/${commission.id}`)}
      style={{ marginBottom: 16 }}
    >
      <p>
        <strong>UGP:</strong> {commission.ugp.dayra}
      </p>
      <p>
        <strong>Commission:</strong> {commission.commission} DA
      </p>
      <p>
        <strong>État:</strong> <Tag color={commission.etat ? "green" : "red"}>{commission.etat ? "Réglé" : "Non réglé"}</Tag>
      </p>
    </Card>
  );
};

export default CommissionCard;
