import React, { useState } from 'react';

function NumberInput({value, handleChange}) {

  return (
    <div>
      <input
        type="number"
        id="numberInput"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default NumberInput