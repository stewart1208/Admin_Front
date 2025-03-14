import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { create } from "@/Actions/Port";
import { Button, Col, Drawer, Form, Input, Row, Space, message } from "antd";

const PortFormDrawer = ({ onPortAdded }) => { // 🟢 Récupérer la prop
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => setOpen(true);
  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const newPort = await create(values); // Appel API pour créer un port
      console.log("Port ajouté:", newPort);
      message.success("Port ajouté avec succès !");

      if (!newPort || !newPort.id) {
        throw new Error("L'objet port retourné est invalide !");
      }

      onPortAdded(newPort); // 🟢 Mettre à jour la liste
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'ajout du port:", err);
      message.error("Échec de l'ajout du port.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} loading={loading}>
        Ajouter un Port
      </Button>
      <Drawer title="Créer un nouveau port" width={500} onClose={onClose} open={open}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="matricule" label="Matricule" rules={[{ required: true, message: "Entrez le matricule" }]}>
                <Input placeholder="Matricule du port" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="dayra" label="Dayra" rules={[{ required: true, message: "Entrez la dayra" }]}>
                <Input placeholder="Dayra du port" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="wilaya" label="Wilaya" rules={[{ required: true, message: "Entrez la wilaya" }]}>
                <Input placeholder="Wilaya du port" />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <Button onClick={onClose}>Annuler</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Ajouter
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default PortFormDrawer;
