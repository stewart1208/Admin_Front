"use client";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,LabelList } from "recharts";
import { getAllLocations } from "@/Actions/Transport/Location";

const PortsByLocationsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await getAllLocations();

        // Regroupement des ports et comptage des locations
        const portCountMap = {};

        locations.forEach((location) => {
          const portName = location.navire?.port?.nom || "Inconnu";
          if (!portCountMap[portName]) {
            portCountMap[portName] = 0;
          }
          portCountMap[portName]++;
        });

        // Transformation en tableau et tri décroissant
        const chartData = Object.entries(portCountMap)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);

        setData(chartData);
      } catch (error) {
        console.error("Erreur lors de la récupération des locations :", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <Card title="Ports classés par nombre de locations">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={150} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#1890ff" name="Locations" >
                        <LabelList dataKey="data.navire.nom" position="center" fill="#fff" fontSize={14} />
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PortsByLocationsChart;
