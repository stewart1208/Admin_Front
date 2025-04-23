'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Rate, Spin, Card, Typography, Divider } from 'antd';
import { getNavireById } from '@/Actions/Transport/Navire';
import ProprietaireCard from '@/Components/Transport/Propritaire/ProprietaireCard';

const { Title, Text } = Typography;

const NavireDetails = () => {
  const { id } = useParams();
  const [navire, setNavire] = useState(null);

  useEffect(() => {
    if (id) {
      getNavireById(id).then(data => setNavire(data));
    }
  }, [id]);

  if (!navire) return <Spin />;

  return (
    <div style={{ padding: '2rem' }}>
      <Card  style={{ marginBottom: '2rem' }}>
        <Title level={3}>{navire.nom}</Title>
        <Text><strong>Matricule:</strong> {navire.matricule}</Text><br />
        <Text><strong>Capacité:</strong> {navire.capacite} personnes</Text><br />
        <Text><strong>Prix:</strong> {navire.prix} DA</Text><br />
        <Text><strong>Rating:</strong></Text><br />      
        <Rate allowHalf disabled defaultValue={navire.rating} /><br />
        <Divider />
        <Text><strong>Port:</strong> {navire.port?.commune} ({navire.port?.matricule})</Text><br />
        <Text><strong>Wilaya:</strong> {navire.port?.wilaya} - {navire.port?.dayra}</Text>
      </Card>

      <Title level={4}>Propriétaire</Title>
      <ProprietaireCard proprietaire={navire.proprietaire} />
    </div>
  );
};

export default NavireDetails;
