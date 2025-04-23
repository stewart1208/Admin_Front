import { Card,} from "antd";

const ArticleCard = ({ article}) => {
  return (
    <Link href={`/pecherie/aritcle/${article.id}`} style={{ textDecoration: "none" }}>
    <Card title={article.nom} style={{ marginBottom: 16 }}>
    </Card>
    </Link>
  );
};

export default ArticleCard;
