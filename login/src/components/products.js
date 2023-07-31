import * as React from 'react';
import {Popover,MenuItem,Menu} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
export default function Products() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuItemHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  
  const open = Boolean(anchorEl);

  return (
    <div>
      <MenuItem
        onMouseEnter={handleMenuItemHover}
        onMouseLeave={handleMenuClose}
      >
        Hover Me for Sub-Menu
      </MenuItem>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
      </Menu>
    </div>
  );
};
  
