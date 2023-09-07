import React, { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import Logo from "../assets/Logo.svg";
import ShipmentList from "./ShipmentList";
import ShipmentDetails from "./ShipmentDetails";
import Search from "./Search";
import { Link, useParams } from "react-router-dom";
import { Shipment } from "../types/Shipment";

const Cargo: React.FC = () => {
  const [showShipmentList, setShowShipmentList] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const jsonDataURL =
    "https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json";
  const [data, setData] = useState<Shipment[]>([]);
  const { shipmentId } = useParams();
  const [filteredData, setFilteredData] = useState<Shipment[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setShowShipmentList(false);
  }, [shipmentId]);

  useEffect(() => {
    fetch(jsonDataURL)
      .then(function (res) {
        return res.json();
      })
      .then(function (jsonData: Shipment[]) {
        setData(jsonData);
        setInterval(() => setIsLoading(false), 1000);
      })
      .catch(function (err) {
        console.log(err, "error");
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFilteredData(data);
    setIsSearching(false);
  }, [data]);

  const toggleShipmentList = () => {
    setShowShipmentList(!showShipmentList);
  };

  const updateShipmentBoxes = (shipmentBoxes: string) => {
    const updatedShipments = data.map((shipment) => {
      if (shipment.id === shipmentId) {
        shipment.boxes = shipmentBoxes;
      }
      return shipment;
    });
    setData(updatedShipments);
  };

  const handleSearchInputChange = (searchInput: string) => {
    if (searchInput === "") {
      setFilteredData(data);
    } else {
      const filteredShipments = data.filter((shipment) =>
        shipment.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredData(filteredShipments);
      setIsSearching(true);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-customDarkGray w-full min-h-screen flex justify-center items-center">
        <div className="flex min-h-screen w-full items-center justify-center bg-customDarkGray">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-slate-50 to-gray-500 animate-spin">
            <div className="h-9 w-9 rounded-full bg-customDarkGray"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      {isMobileScreen ? (
        <div className="p-4 grid grid-cols-[100%]">
          <div className="col-span-1 grid grid-rows-[auto, 1fr] space-y-5 text-sm md:text-base">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-40 h-15">
                <Link
                  to="/"
                  onClick={() => handleSearchInputChange("")}
                  className="cursor-pointer"
                >
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
              <button
                className={`fixed top-2 right-2 p-2 rounded-md text-white`}
                onClick={toggleShipmentList}
              >
                {showShipmentList ? (
                  <MdClose size={24} />
                ) : (
                  <MdMenu size={24} />
                )}
              </button>
            </div>

            {!showShipmentList ? (
              <Search onSearch={handleSearchInputChange} shipments={data} />
            ) : null}

            {showShipmentList ? (
              <ShipmentList
                shipments={data}
                filteredData={filteredData}
                shipmentId={shipmentId}
              />
            ) : (
              <ShipmentDetails
                shipments={data}
                shipmentId={shipmentId}
                updateShipmentBoxes={updateShipmentBoxes}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="p-10 grid grid-cols-[20%,80%]">
          <div className="col-span-1 space-y-6">
            <div className="w-22 h-42">
              <Link
                to="/"
                onClick={() => handleSearchInputChange("")}
                className="cursor-pointer"
              >
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
            <ShipmentList
              shipments={data}
              filteredData={filteredData}
              shipmentId={shipmentId}
            />
          </div>
          <div className="col-span-1 grid grid-rows-[auto,1fr] space-y-6 md:pl-6 md:pt-0 md:pb-6">
            <Search onSearch={handleSearchInputChange} shipments={data} />
            <div className="h-full">
              <ShipmentDetails
                shipments={data}
                shipmentId={shipmentId}
                updateShipmentBoxes={updateShipmentBoxes}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cargo;
