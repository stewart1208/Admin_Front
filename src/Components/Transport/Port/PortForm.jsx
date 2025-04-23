import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Space, message } from "antd";
import { createPort, updatePort } from "@/Actions/Transport/Port";

const PortForm = ({ port, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (port) {
      form.setFieldsValue(port); // Pré-remplir si modification
    } else {
      form.resetFields(); // Sinon, formulaire vide
    }
  }, [port, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (port) {
        await updatePort(port.id, values);
        message.success("Port modifié avec succès !");
      } else {
        await createPort(values);
        message.success("Port créé avec succès !");
      }
      onClose(); // Fermer drawer et recharger la liste
    } catch (err) {
      console.error("Erreur :", err);
      message.error("Échec de l’opération.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="matricule"
            label="Matricule"
            rules={[{ required: true, message: "Entrez le matricule" }]}
          >
            <Input placeholder="Matricule du port" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="commune"
            label="Commune"
            rules={[{ required: true, message: "Entrez la commune" }]}
          >
            <Input placeholder="Commune du port" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="dayra"
            label="Dayra"
            rules={[{ required: true, message: "Entrez la dayra" }]}
          >
            <Input placeholder="Dayra du port" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="wilaya"
            label="Wilaya"
            rules={[{ required: true, message: "Entrez la wilaya" }]}
          >
            <Input placeholder="Wilaya du port" />
          </Form.Item>
        </Col>
      </Row>

      <Space>
        <Button onClick={onClose}>Annuler</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {port ? "Modifier" : "Créer"}
        </Button>
      </Space>
    </Form>
  );
};

export default PortForm;
