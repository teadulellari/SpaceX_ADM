import React from "react";
import { Link } from "react-router-dom";
import { Shipment } from "../types/Shipment";

type ShipmentListProps = {
  shipments: Shipment[];
  filteredData: Shipment[];
  shipmentId: string | undefined;
};

const ShipmentList: React.FC<ShipmentListProps> = ({
  filteredData,
  shipmentId,
}) => {
  return (
    <div className="h-[550px] md:h-[630]">
      <div>
        <h3 className="text-customLightGray pb-4">SHIPMENT LIST</h3>
      </div>
      <div className="text-customLightGray h-[550px] md:h-[600] overflow-y-auto py-4">
        {filteredData.map((shipment, index) => {
          let classes = "cursor-pointer py-2";
          if (shipment.id === shipmentId) classes += " selectedCargo";
          return (
            <div key={shipment.id} className={classes}>
              <Link to={`/${shipment.id}`}>
                <h3>{shipment.name}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipmentList;
