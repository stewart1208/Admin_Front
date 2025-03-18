"use client";
import React, { useState } from "react";
import { Button, Drawer, Form, Input, InputNumber, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createUgp } from "../../Actions/Ugp";

const AddUGP = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        commission: values.commission / 100, // 🔹 Division ici
      };
      await createUgp(data);
      message.success("UGP créée avec succès !");
      closeDrawer();
      onSuccess(); // 🔹 Rafraîchir la liste après création
    } catch (error) {
      message.error("Échec de la création de l'UGP !");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
        Créer UGP
      </Button>

      <Drawer title="Créer une nouvelle UGP" width={400} onClose={closeDrawer} open={open}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Commission (%)"
            name="commission"
            rules={[{ required: true, message: "La commission est obligatoire" }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Dayra"
            name="dayra"
            rules={[{ required: true, message: "La dayra est obligatoire" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Wilaya"
            name="wilaya"
            rules={[{ required: true, message: "La wilaya est obligatoire" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "L'email est obligatoire" },
              { type: "email", message: "Email invalide" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Le mot de passe est obligatoire" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Créer
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AddUGP;
