import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

function KillPointField({killPoints}) {
    return (
        <Chip
            label={`Points Defeated: ${killPoints}`}
        />
    );
};

KillPointField.propTypes = {
    killPoints: PropTypes.number.isRequired,
};

export default KillPointField;
