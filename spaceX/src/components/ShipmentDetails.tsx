import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Shipment } from "../types/Shipment";

type ShipmentDetailsProps = {
  shipments: Shipment[];
  shipmentId: string | undefined;
  updateShipmentBoxes: (shipmentBoxes: string) => void;
};
const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  shipments,
  shipmentId,
  updateShipmentBoxes,
}) => {
  const selectedShipment = shipments.find(
    (shipment) => shipment.id === shipmentId
  );

  const [cargoTotal, setCargoTotal] = useState<number>(0);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateShipmentBoxes(event.target.value);
  };

  useEffect(() => {
    let newTotal = 0;
    const selectCargoUnitsArray =
      selectedShipment?.boxes?.split(",").map(Number) || [];

    for (let unit of selectCargoUnitsArray) {
      newTotal += unit;
    }
    setCargoTotal(newTotal);
  }, [selectedShipment, selectedShipment?.boxes]);

  if (!selectedShipment) {
    return <div></div>;
  }

  return (
    <div className="h-[550px]  md:h-[630px] p-8 space-y-6 bg-customLightBg rounded-md radius-[30px] flex flex-wrap flex-col text-sm w-full pr-2 text-base break-all">
      <h1 className="text-4xl text-white font-semibold">
        {selectedShipment.name}
      </h1>
      <h4 className="t text-customLightGray overflow-wrap break-word">
        {selectedShipment.email}
      </h4>

      <label className="block text-customLightGray font-semibold">
        CARGO BOXES
      </label>
      <input
        className="border rounded-md  py-2 px-2 w-56 text-gray-700 bg-customWhite border-gray-300 focus:outline-none focus:border-blue-500 overflow-auto"
        onChange={handleChange}
        value={selectedShipment.boxes ? selectedShipment.boxes : ""}
      />

      <h3 className="text-base text-customLightGray font-semibold">
        Number of required cargo bays
      </h3>
      <h1 className="text-4xl text-customWhite">
        {Math.ceil(cargoTotal / 10)}
      </h1>
    </div>
  );
};

export default ShipmentDetails;
