import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, onChangeFilter }) => (
  <input
    type="text"
    value={filter}
    onChange={e => onChangeFilter(e.target.value)}
    placeholder="Search contacts"
  />
);

Filter.propType = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
