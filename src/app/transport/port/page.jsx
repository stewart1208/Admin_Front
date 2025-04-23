'use client';
import { useEffect, useState } from 'react';
import { getAllPorts } from '@/Actions/Transport/Port';
import { Button, Drawer, Spin, List, Typography } from 'antd';
import PortCard from '@/Components/Transport/Port/PortCard';
import PortForm from '@/Components/Transport/Port/PortForm';
import { PlusOutlined } from '@ant-design/icons';

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
        <List
          grid={{ gutter: 24, column: 3 }}
          dataSource={ports}
          locale={{ emptyText: "Aucun port trouvé." }}
          renderItem={(port) => (
            <List.Item>
              <div  className="cursor-pointer w-full">
                <PortCard port={port} />
              </div>
            </List.Item>
          )}
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
