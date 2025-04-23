'use client';
import { useEffect, useState } from 'react';
import { Select, Spin, Row, Col, Space } from 'antd';
import ReservationCard from '@/Components/Transport/Reservation/ReservationCard';
import { getAllReservations } from '@/Actions/Transport/Reservation';

const { Option } = Select;

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [etat, setEtat] = useState('all');
  const [clientId, setClientId] = useState('all');
  const [navireId, setNavireId] = useState('all');
  const [portId, setPortId] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAllReservations();
      setReservations(data);
      setFiltered(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let res = [...reservations];

    if (etat !== 'all') {
      res = res.filter(r => r.state === (etat === 'valid'));
    }

    if (clientId !== 'all') {
      res = res.filter(r => r.client?.id === clientId);
    }

    if (navireId !== 'all') {
      res = res.filter(r => r.navire?.id === navireId);
    }

    if (portId !== 'all') {
      res = res.filter(r => r.port?.id === portId);
    }

    setFiltered(res);
  }, [etat, clientId, navireId, portId, reservations]);

  if (loading) return <Spin />;

  // Préparation des listes pour les filtres dynamiques
  const clients = [...new Set(reservations.map(r => r.client?.id))]
    .map(id => reservations.find(r => r.client?.id === id)?.client)
    .filter(Boolean);

  const navires = [...new Set(reservations.map(r => r.navire?.id))]
    .map(id => reservations.find(r => r.navire?.id === id)?.navire)
    .filter(Boolean);

  const ports = [...new Set(reservations.map(r => r.port?.id))]
    .map(id => reservations.find(r => r.port?.id === id)?.port)
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <Space wrap style={{ marginBottom: 20 }}>
        <Select value={etat} onChange={setEtat} placeholder="État" style={{ width: 150 }}>
          <Option value="all">Tous</Option>
          <Option value="valid">Validées</Option>
          <Option value="nonvalid">Non validées</Option>
        </Select>

        <Select value={clientId} onChange={setClientId} placeholder="Client" style={{ width: 200 }}>
          <Option value="all">Tous les clients</Option>
          {clients.map(c => (
            <Option key={c.id} value={c.id}>{c.prenom} {c.nom}</Option>
          ))}
        </Select>

        <Select value={navireId} onChange={setNavireId} placeholder="Navire" style={{ width: 200 }}>
          <Option value="all">Tous les navires</Option>
          {navires.map(n => (
            <Option key={n.id} value={n.id}>{n.nom}</Option>
          ))}
        </Select>

        <Select value={portId} onChange={setPortId} placeholder="Port" style={{ width: 200 }}>
          <Option value="all">Tous les ports</Option>
          {ports.map(p => (
            <Option key={p.id} value={p.id}>{p.commune}</Option>
          ))}
        </Select>
      </Space>

      <Row gutter={[16, 16]}>
        {filtered.map(res => (
          <Col span={8} key={res.id}>
            <ReservationCard reservation={res} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ReservationList;
