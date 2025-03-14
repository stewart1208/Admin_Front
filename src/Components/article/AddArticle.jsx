"use client"
import { Drawer, Form, Input, Button } from "antd";
import { useState } from "react";
import { create } from "../../Actions/Article";

const AddArticle = ({ open, onClose, onArticleAdded }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await create(values);
      onArticleAdded();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer title="Ajouter un article" onClose={onClose} open={open}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Nom" name="nom" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Ajouter</Button>
      </Form>
    </Drawer>
  );
};

export default AddArticle;
