import React from 'react';

function SortBar({ onSort, onClassFilterChange, classFilters }) {
  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  const handleClassFilterChange = (e) => {
    const classFilter = e.target.value;
    onClassFilterChange(classFilter);
  };

  return (
    <div className="sort-bar">
      <label>
        Sort by: <select onChange={handleSortChange}>
          <option value="health">Health</option>
          <option value="damage">Damage</option>
          <option value="armor">Armor</option>
        </select>
      </label>
      <br />
      <div>
        Filter by class:
        <label>
          <input
            type="checkbox"
            value="Medic"
            checked={classFilters.includes('Medic')}
            onChange={handleClassFilterChange}
          />
          Medic
        </label>
        <label>
          <input
            type="checkbox"
            value="Assault"
            checked={classFilters.includes('Assault')}
            onChange={handleClassFilterChange}
          />
          Assault
        </label>
        <label>
          <input
            type="checkbox"
            value="Support"
            checked={classFilters.includes('Support')}
            onChange={handleClassFilterChange}
          />
          Support
        </label>
        <label>
          <input
            type="checkbox"
            value="Defender"
            checked={classFilters.includes('Defender')}
            onChange={handleClassFilterChange}
          />
          Defender
        </label>
        <label>
          <input
            type="checkbox"
            value="Captain"
            checked={classFilters.includes('Captain')}
            onChange={handleClassFilterChange}
          />
          Captain
        </label>
        <label>
          <input
            type="checkbox"
            value="Witch"
            checked={classFilters.includes('Witch')}
            onChange={handleClassFilterChange}
          />
          Witch
        </label>
        
      </div>
    </div>
  );
}

export default SortBar;