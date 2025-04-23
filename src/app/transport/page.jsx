"use client";
import React from "react";
import StatistiquesTransport from "@/Components/Transport/Statistique/TransportStatistiques";
import ReservationPieChart from "@/Components/Transport/Statistique/ReservationStatistiques";
import LocationStatistiques from "@/Components/Transport/Statistique/LocationsStatistiques";

const DashboardTransport = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <StatistiquesTransport />
      <ReservationPieChart />
      <LocationStatistiques />
    </div>
  );
};

export default DashboardTransport;
