"use client";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAllReservations } from "@/Actions/Transport/Reservation"; // Service pour récupérer toutes les réservations

const COLORS = ["#52c41a", "#f5222d"]; // Vert pour valides, rouge pour non valides

const ReservationPieChart = () => {
  const [data, setData] = useState([
    { name: "Valides", value: 0 },
    { name: "Non valides", value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupère toutes les réservations
        const allReservations = await getAllReservations();
        
        // Filtrage local des réservations valides et non valides
        const validReservations = allReservations.filter((reservation) => reservation.state);  // Si tu as une propriété `isValid`
        const invalidReservations = allReservations.filter((reservation) => !reservation.state);

        // Mise à jour de l'état avec les résultats filtrés
        setData([
          { name: "Valides", value: validReservations.length },
          { name: "Non valides", value: invalidReservations.length },
        ]);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card title="Répartition des réservations">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ReservationPieChart;
