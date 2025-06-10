'use client';

import { useEffect, useState } from 'react';
import { getAllNavires } from '@/Actions/Transport/Navire';
import { Table, Spin, Tag } from 'antd';
import Link from 'next/link';

const NavireListe = () => {
  const [navires, setNavires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNavires().then(data => {
      setNavires(data);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      render: (text, record) => (
        <Link href={`/transport/navire/${record.id}`}>
          <Tag color="blue" style={{ cursor: 'pointer' }}>{text}</Tag>
        </Link>
      ),
    },
    {
      title: 'Matricule',
      dataIndex: 'matricule',
      key: 'matricule',
    },
    {
      title: 'Capacité',
      dataIndex: 'capacite',
      key: 'capacite',
    },
    {
      title: 'Prix',
      dataIndex: 'prix',
      key: 'prix',
      render: (prix) => `${prix.toLocaleString()} DA`
    },
    {
      title: 'Date de création',
      dataIndex: 'create_At',
      key: 'create_At',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  if (loading) return <Spin fullscreen />;

  return (
    <Table
      dataSource={navires}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default NavireListe;
