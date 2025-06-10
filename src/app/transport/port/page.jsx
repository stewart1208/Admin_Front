'use client';

import { useEffect, useState } from 'react';
import { getAllPorts } from '@/Actions/Transport/Port';
import { Button, Drawer, Spin, Typography, Table, Tag } from 'antd';
import PortForm from '@/Components/Transport/Port/PortForm';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title } = Typography;

const PortList = () => {
  const [ports, setPorts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPort, setEditingPort] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPorts();
  }, []);

  const fetchPorts = async () => {
    setLoading(true);
    try {
      const data = await getAllPorts();
      setPorts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des ports', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (port) => {
    setEditingPort(port);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingPort(null);
    setOpen(true);
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'commune',
      key: 'commune',
      render: (text, record) => (
        <Link href={`/transport/port/${record.id}`}>
          <Tag color="geekblue" style={{ cursor: 'pointer' }}>{text}</Tag>
        </Link>
      ),
    },
    {
      title: 'Nombre de navires',
      key: 'navires',
      render: (_, record) => record.navires?.length || 0,
    },
    {
      title: 'Date de création',
      dataIndex: 'create_At',
      key: 'create_At',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="!mb-0">Liste des Ports</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
          className="rounded-xl shadow"
        >
          Créer un port
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={ports}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={editingPort ? "Modifier le port" : "Créer un port"}
        width={500}
        destroyOnClose
      >
        <PortForm
          port={editingPort}
          onClose={() => {
            setOpen(false);
            fetchPorts();
          }}
        />
      </Drawer>
    </div>
  );
};

export default PortList;
