"use client";
import { Drawer, Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { update } from "../../Actions/Article";

const UpdateArticle = ({ open, onClose, article, onArticleUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(article);
  }, [article, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await update(article.id, values);
      onArticleUpdated();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer title="Modifier l'article" onClose={onClose} open={open}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Nom" name="nom" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Modifier</Button>
      </Form>
    </Drawer>
  );
};

export default UpdateArticle;
