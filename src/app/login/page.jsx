"use client";
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { login } from "../../Actions/Auth";
import { useRouter } from "next/navigation";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await login(values.email, values.password);
            message.success("Connexion réussie !");
            router.push("/"); // Rediriger vers le tableau de bord
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Connexion</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Mot de passe" name="password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Se connecter
                </Button>
            </Form>
        </div>
    );
};

export default Login;
