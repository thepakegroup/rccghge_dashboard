import { useState, ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (selectedOption: string) => void;
}

const CustomSelect = ({ options, onChange }: CustomSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="custom-select">
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="input"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
