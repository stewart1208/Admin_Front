'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLocationById } from '@/Actions/Transport/Location';
import { Card, Descriptions, Spin, Alert } from 'antd';
import Link from 'next/link';

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLocationById(id);
        setLocation(data);
      } catch (err) {
        setError('Erreur lors du chargement de la location');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Spin fullscreen />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <>
      <Card title="Détails de la Location" style={{ marginBottom: 24 }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Date">{new Date(location.date).toLocaleDateString()}</Descriptions.Item>
          <Descriptions.Item label="Port">{location.port.commune} - {location.port.wilaya}</Descriptions.Item>
          <Descriptions.Item label="Navire">{location.navire.nom} ({location.navire.matricule})</Descriptions.Item>
          <Descriptions.Item label="Prix">{location.navire.prix} DA</Descriptions.Item>
          <Descriptions.Item label="Date de validation par le propriétaire">{new Date(location.create_At).toLocaleDateString()}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Cartes personnalisées cliquables */}
  <div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'stretch', // garantit la même hauteur
  }}
>
  {/* Client */}
  <Link href={`/transport/client/${location.client.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, minWidth: '300px' }}>
    <div
      style={{
        height: '100%', // s'étire pour égaler les autres
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'}
    >
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', textAlign: 'center' }}>Client</h3>
      <p><strong>Nom :</strong> {location.client.nom}</p>
      <p><strong>Prénom :</strong> {location.client.prenom}</p>
      <p><strong>Téléphone :</strong> {location.client.numTelephone}</p>
      <p><strong>Wilaya :</strong> {location.client.wilaya}</p>
      <p><strong>Dayra :</strong> {location.client.dayra}</p>
    </div>
  </Link>

  {/* Navire */}
  <Link href={`/transport/navire/${location.navire.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, minWidth: '300px' }}>
    <div
      style={{
        height: '100%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'}
    >
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', textAlign: 'center' }}>Navire</h3>
      <p><strong>Nom :</strong> {location.navire.nom}</p>
      <p><strong>Matricule :</strong> {location.navire.matricule}</p>
      <p><strong>Prix :</strong> {location.navire.prix} DA</p>
    </div>
  </Link>

  {/* Port */}
  <Link href={`/transport/port/${location.port.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, minWidth: '300px' }}>
    <div
      style={{
        height: '100%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'}
    >
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', textAlign: 'center' }}>Port</h3>
      <p><strong>Commune :</strong> {location.port.commune}</p>
      <p><strong>Wilaya :</strong> {location.port.wilaya}</p>
    </div>
  </Link>
</div>

    </>
  );
};

export default LocationDetails;
