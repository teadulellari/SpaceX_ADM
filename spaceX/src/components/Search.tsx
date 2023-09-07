import React, { ChangeEventHandler, useState } from "react";
import { Shipment } from "../types/Shipment";
import Autocomplete from "./Autocomplete";
type SearchProps = {
  onSearch: (searchInput: string) => void;
  shipments: Shipment[];
};

const Search: React.FC<SearchProps> = ({ onSearch, shipments }) => {
  return (
    <div className="relative">
      <Autocomplete suggestions={shipments} onSearch={onSearch} />
    </div>
  );
};

export default Search;
