'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getReservationById } from '@/Actions/Transport/Reservation';
import { Spin, Divider } from 'antd';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from "next/link";


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
      {/* Détails réservation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border rounded-xl p-4 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-2">Détails de la réservation</h2>
        <p><strong>Date :</strong> {dayjs(reservation.date).format('DD/MM/YYYY')}</p>

        <div className="flex items-center gap-2 mt-2">
          {isValid ? (
            <CheckCircle color="green" size={20} />
          ) : (
            <XCircle color="red" size={20} />
          )}
          <span className={`font-semibold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
            {isValid ? 'Validée' : 'Non validée'}
          </span>
        </div>

        <p className="mt-2"><strong>Créée le :</strong> {dayjs(reservation.create_At).format('DD/MM/YYYY HH:mm')}</p>
      </motion.div>

      {/* Infos liées */}
      <Divider orientation="left">Informations liées</Divider>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
  {/* Client */}
      <Link href={`/transport/client/${reservation.client.id}`}>
  <div
    style={{
      flex: 1,
      minWidth: '300px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }}
  >
    <h1 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', textAlign: 'center' }}>Client</h1>
    <p><strong>Nom :</strong> {reservation.client.nom}</p>
    <p><strong>Prénom :</strong> {reservation.client.prenom}</p>
    <p><strong>Téléphone :</strong> {reservation.client.numTelephone}</p>
    <p><strong>Wilaya :</strong> {reservation.client.wilaya}</p>
    <p><strong>Dayra :</strong> {reservation.client.dayra}</p>
  </div>
      </Link>

  {/* Navire */}
        <Link href={`/transport/navire/${reservation.navire.id}`}>
  <div
    style={{
      flex: 1,
      minWidth: '300px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }}
  >
    <h1 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' , textAlign : 'center' }}>Navire</h1>
    <p><strong>Nom :</strong> {reservation.navire.nom}</p>
    <p><strong>Matricule :</strong> {reservation.navire.matricule}</p>
  </div>
        </Link>

  {/* Port */}
        <Link href={`/transport/port/${reservation.port.id}`}>
  <div
    style={{
      flex: 1,
      minWidth: '300px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }}
  >
    <h1 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' , textAlign : 'center' }}>Port</h1>
    <p><strong>Nom :</strong> {reservation.port.commune}</p>
    <p><strong>Wilaya :</strong> {reservation.port.wilaya}</p>
  </div>
        </Link>

</div>

    </div>
  );
};

export default ReservationDetails;
