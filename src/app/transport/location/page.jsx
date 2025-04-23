"use client";
import { useEffect, useState } from "react";
import { getAllLocations } from "@/Actions/Transport/Location";
import LocationCard from "@/components/Transport/Location/LocationCard"
import { Spin, Alert } from "antd";

const LocationListe = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
      } catch (err) {
        setError("Erreur lors du chargement des locations");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spin fullscreen />;
  if (error) return <Alert type="error" message={error} />;

  return locations.map(loc => <LocationCard key={loc.id} location={loc} />);
};

export default LocationListe;
