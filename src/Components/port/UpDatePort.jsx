import React from "react";
import { Drawer, Form, Input, Button, Space, message } from "antd";
import { update } from "@/Actions/Port";

const EditPortDrawer = ({ open, onClose, port, onPortUpdated }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (port) {
      form.setFieldsValue(port);
    }
  }, [port, form]);

  const onFinish = async (values) => {
    try {
      const updatedPort = await update(port.id, values);
      onPortUpdated(updatedPort);
      message.success("Port mis à jour avec succès !");
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      message.error("Échec de la mise à jour.");
    }
  };

  return (
    <Drawer title="Modifier le Port" width={500} onClose={onClose} open={open}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="matricule" label="Matricule" rules={[{ required: true, message: "Entrez le matricule" }]}>
          <Input placeholder="Matricule du port" />
        </Form.Item>
        <Form.Item name="dayra" label="Dayra" rules={[{ required: true, message: "Entrez la dayra" }]}>
          <Input placeholder="Dayra du port" />
        </Form.Item>
        <Form.Item name="wilaya" label="Wilaya" rules={[{ required: true, message: "Entrez la wilaya" }]}>
          <Input placeholder="Wilaya du port" />
        </Form.Item>
        <Space>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="primary" htmlType="submit">Mettre à jour</Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default EditPortDrawer;
