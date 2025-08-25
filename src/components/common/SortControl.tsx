import React, { useState } from 'react';

interface SortControlProps {
  options: string[];
  onChange: (option: string) => void;
  defaultOptionIndex?: number;
}

const SortControl: React.FC<SortControlProps> = ({ options, onChange, defaultOptionIndex = 0 }) => {
  const [selectedOption, setSelectedOption] = useState(options[defaultOptionIndex]);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelection = event.target.value;
    if (newSelection !== selectedOption) {
      setSelectedOption(newSelection);
      onChange(newSelection);
    }
  };

  return (
    <div className="flex items-center font-montserrat">
      <label htmlFor="sort-control" className="text-gray-400 mr-4 uppercase text-sm font-semibold tracking-wider">
        Sort By
      </label>
      <div className="relative">
        <select
          id="sort-control"
          value={selectedOption}
          onChange={handleSelectionChange}
          className="appearance-none bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-0 cursor-pointer"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-gray-900 text-white">
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SortControl;
