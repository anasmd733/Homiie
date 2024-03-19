import React, { useState } from 'react';

const RadioForm = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedOption) {
      setError('Please select an option');
    } else {
      // Proceed with form submission
      setError('');
      // Your form submission logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="radio"
          id="option1"
          name="option"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={handleOptionChange}
        />
        <label htmlFor="option1">Option 1</label>
      </div>
      <div>
        <input
          type="radio"
          id="option2"
          name="option"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={handleOptionChange}
        />
        <label htmlFor="option2">Option 2</label>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default RadioForm;
