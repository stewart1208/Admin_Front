import React from "react";
import { Card} from "antd";
import Link from "next/link";

function PortCard({ port,}) {
  return (
    <Link href={`/pecherie/port/${port.id}`} style={{ textDecoration: "none" }}>
    <Card 
        title={port.matricule} 
        style={{ width: 300 }}
        className="transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
    >
      <p><strong>Dayra:</strong> {port.dayra}</p>
      <p><strong>Wilaya:</strong> {port.wilaya}</p>
      {port.ugp && <p><strong>UGP:</strong> {port.ugp.dayra}</p>}
      <p><strong>Créé le:</strong> {new Date(port.create_At).toLocaleDateString()}</p>
    </Card>
    </Link>
  );
}

export default PortCard;
