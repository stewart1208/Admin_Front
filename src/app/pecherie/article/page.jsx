"use client";
import { useEffect, useState } from "react";
import { Table, Button, Spin } from "antd";
import { getAll } from "../../../Actions/Article";
import AddArticle from "../../../components/article/AddArticle";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await getAll();
      setArticles(data);
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Catégorie",
      dataIndex: ["category", "nom"],
      key: "category",
      render: (text) => text || "Non définie",
    },
    {
      title: "Commission",
      dataIndex: ["category", "commission"],
      key: "commission",
      render: (value) => (value ? `${value} DA` : "Non définie"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, article) => (
        <>
          <Link href={`/pecherie/article/${article.id}`}>
            <Button type="link">Voir</Button>
          </Link>
        </>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto" }}>
      <Button type="primary" onClick={() => setAddDrawerOpen(true)} style={{ marginBottom: 16 }}>
        Ajouter un article
      </Button>
      <Table columns={columns} dataSource={articles} rowKey="id" pagination={{ pageSize: 5 }} />
      <AddArticle open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} onArticleAdded={fetchArticles} />
    </div>
  );
};

export default ArticlesPage;
