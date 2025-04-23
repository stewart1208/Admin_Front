import { Card, Tag } from "antd";
import { RadarChartOutlined , EnvironmentOutlined } from "@ant-design/icons";
import Link from "next/link";

const PortCard = ({ port }) => {
  return (
    <Link href={`/transport/port/${port.id}`}>
    <Card
      title={
        <span className="text-lg font-semibold">
          {port.commune} - {port.matricule}
        </span>
      }
      className="rounded-2xl shadow-md hover:shadow-lg transition duration-300"
      extra={<Tag color="blue">Navires: {port.navires?.length || 0}</Tag>}
    >
      <p>
        <EnvironmentOutlined className="mr-2" />
        Wilaya: <strong>{port.wilaya}</strong>
      </p>
      <p>
        <EnvironmentOutlined className="mr-2" />
        Dayra: <strong>{port.dayra}</strong>
      </p>
      {port.navires?.length > 0 && (
        <p>
          <RadarChartOutlined  className="mr-2" />
          {port.navires.length} navire{port.navires.length > 1 ? "s" : ""}
        </p>
      )}
    </Card>
    </Link>
  );
};

export default PortCard;
