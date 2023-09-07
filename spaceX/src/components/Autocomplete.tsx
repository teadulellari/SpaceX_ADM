import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shipment } from "../types/Shipment";

interface AutocompleteProps {
  suggestions: Shipment[];
  onSearch: (searchInput: string) => void;
}

interface AutocompleteState {
  activeSuggestion: number;
  filteredSuggestions: Shipment[];
  showSuggestions: boolean;
  userInput: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  onSearch,
}) => {
  const [state, setState] = useState<AutocompleteState>({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  });

  useEffect(() => {
    onSearch(""); 
  }, []);

  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    onSearch(e.currentTarget.value);
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput,
    });
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  const onBlur = () => {
    onSearch("");
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { activeSuggestion, filteredSuggestions } = state;

    if (e.keyCode === 13) {
      setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion].name,
        filteredSuggestions: filteredSuggestions,
      });
      navigate(`/${filteredSuggestions[activeSuggestion].id}`);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setState({ ...state, activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion === filteredSuggestions.length - 1) {
        return;
      }

      setState({ ...state, activeSuggestion: activeSuggestion + 1 });
    }
  };

  let suggestionsListComponent: JSX.Element | null = null;

  if (state.showSuggestions && state.userInput) {
    if (state.filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {state.filteredSuggestions.map((suggestion, index) => {
            let className = "";

            if (index === state.activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li className={className} key={suggestion.id} onClick={onClick}>
                <Link
                  key={index}
                  to={`/${suggestion.id}`}
                  className="cursor-pointer"
                >
                  <h3>{suggestion.name}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No shipment matched!</em>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        value={state.userInput}
        className="w-full md:w-auto border rounded-md px-8 py-2 h-10 text-black bg-white border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {!suggestionsListComponent && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-black absolute left-2 top-1/2 transform -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 20l-6-6M9 17a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      )}
      {suggestionsListComponent}
    </React.Fragment>
  );
};

export default Autocomplete;
