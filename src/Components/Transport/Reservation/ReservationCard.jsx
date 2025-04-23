import { Card, Tag } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';

const ReservationCard = ({ reservation }) => {
  return (
    <Link href={`/transport/reservation/${reservation.id}`}>
      <Card
        hoverable
        title={reservation.navire?.nom}
        extra={
          <Tag color={reservation.state ? 'green' : 'red'}>
            {reservation.state ? 'Validée' : 'Non validée'}
          </Tag>
        }
      >
        <p><strong>Date :</strong> {dayjs(reservation.date).format('DD/MM/YYYY')}</p>
        <p><strong>Client :</strong> {reservation.client?.prenom} {reservation.client?.nom}</p>
        <p><strong>Port :</strong> {reservation.port?.commune}</p>
      </Card>
    </Link>
  );
};

export default ReservationCard;
