import { Card } from 'antd';
import ProprietaireCard from '../Propritaire/ProprietaireCard';
import LocationCard from '../Location/LocationCard';
import Link from "next/link";

const NavireCard = ({ navire }) => {
  return (
    <Link href={`/transport/navire/${navire.id}`}>
    <Card title={`${navire.nom} (${navire.matricule})`} style={{ marginBottom: 16 ,width: 300 }} hoverable>
      <p>Capacité : {navire.capacite}</p>
      <p>Prix : {navire.prix} DA</p>
      <p>Port : {navire.port?.commune} ({navire.port?.matricule})</p>
{/*
      {navire.proprietaire && (
        <>
          <h4>Propriétaire :</h4>
          <ProprietaireCard proprietaire={navire.proprietaire} />
        </>
      )}

      {navire.loyers?.length > 0 && (
        <>
          <h4>Loyers :</h4>
          {navire.loyers.map((l, i) => (
            <LocationCard key={i} location={l} />
          ))}
        </>
      )}
         */}
    </Card>
    </Link>
  );
};

export default NavireCard;
