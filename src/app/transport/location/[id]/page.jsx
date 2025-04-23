"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocationById } from "@/Actions/Transport/Location";
import { Card, Descriptions, Spin, Alert } from "antd";
import ClientCard from "@/components/Transport/Client/ClientCard";
import NavireCard from "@/Components/Transport/Navire/NavireCard";
import PortCard from "@/Components/Transport/Port/PortCard";  

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLocationById(id);
        setLocation(data);
      } catch (err) {
        setError("Erreur lors du chargement de la location");
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
      <div className="flex flex-row gap-2 overflow-auto whitespace-nowrap">
  <div className="inline-block"><ClientCard client={location.client} /></div>
  <div className="inline-block"><NavireCard navire={location.navire} /></div>
  <div className="inline-block"><PortCard port={location.port} /></div>
</div>

    </>
  );
};

export default LocationDetails;
