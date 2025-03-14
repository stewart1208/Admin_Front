"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Spin, Button } from "antd";
import { getById } from "../../../Actions/Article";
import UpdateArticle from "../../../Components/article/updateArticle";

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const data = await getById(id);
      setArticle(data);
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" />;
  if (!article) return <p>Aucun article trouvé.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <Card title={article.nom}>
        <p><strong>Catégorie:</strong> {article.category?.nom || "Non définie"}</p>
        <p>{article.category?.commission || " "} DA</p>
        <Button type="primary" onClick={() => setUpdateDrawerOpen(true)}>Modifier</Button>
      </Card>
      <UpdateArticle open={updateDrawerOpen} onClose={() => setUpdateDrawerOpen(false)} article={article} onArticleUpdated={fetchArticle} />
    </div>
  );
};

export default ArticleDetailsPage;
