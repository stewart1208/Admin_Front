'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getReservationById } from '@/Actions/Transport/Reservation';
import { Card, Spin, Divider } from 'antd';
import ClientCard from '@/Components/Transport/Client/ClientCard';
import NavireCard from '@/Components/Transport/Navire/NavireCard';
import PortCard from '@/Components/Transport/Port/PortCard';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    if (id) {
      getReservationById(id).then(setReservation);
    }
  }, [id]);

  if (!reservation) return <Spin />;

  const isValid = reservation.state;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card title="Détails de la réservation">
          <p><strong>Date :</strong> {dayjs(reservation.date).format('DD/MM/YYYY')}</p>

          <motion.div
            className="flex items-center gap-2 mt-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {isValid ? (
              <CheckCircle color="green" size={20} />
            ) : (
              <XCircle color="red" size={20} />
            )}
            <span className={`font-semibold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
              {isValid ? 'Validée' : 'Non validée'}
            </span>
          </motion.div>

          <p className="mt-2"><strong>Créée le :</strong> {dayjs(reservation.create_At).format('DD/MM/YYYY HH:mm')}</p>
        </Card>
      </motion.div>

      <Divider orientation="left">Client</Divider>
      <ClientCard client={reservation.client} />

      <Divider orientation="left">Navire</Divider>
      <NavireCard navire={reservation.navire} />

      <Divider orientation="left">Port</Divider>
      <PortCard port={reservation.port} />
    </div>
  );
};

export default ReservationDetails;
