"use client";
import { Card, Tag } from "antd";
import Link from "next/link";
import { getLocationById } from "@/Actions/Transport/Location";
import { useEffect, useState } from "react";

const LocationCard = ({ id }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (id) {
      getLocationById(id).then(setLocation);
    }
  }, [id]);

  if (!location) return null;

  return (
    <Link href={`/transport/location/${location.id}`}>
      <Card
        title={`Location - ${new Date(location.date).toLocaleDateString()}`}
        hoverable
      >
        <p><strong>Client:</strong> {location.client.nom} {location.client.prenom}</p>
        <p><strong>Navire:</strong> {location.navire.nom} ({location.navire.matricule})</p>
        <p><strong>Port:</strong> {location.port.commune}, {location.port.dayra}</p>
        <Tag color="blue">Prix d'allocation: {location.navire.prix} DA</Tag>
      </Card>
    </Link>
  );
};

export default LocationCard;
