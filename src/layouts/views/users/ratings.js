import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import SoftTypography from 'components/SoftTypography';

function RatingList(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={handleToggle}>
        {isOpen ? 'Hide Ratings' : 'Show Ratings'}
      </Button>

      <Collapse in={isOpen}>
        <List>
          {
            Object.keys(props.user.ratings).map(key => (
              <ListItem key={key}>
                <ListItemText>
                  <SoftTypography variant="body2" component="span">
                    {key.replace(/_/g, " ")}: {props.user.ratings[key]}
                  </SoftTypography>
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Collapse>
    </div>
  );
}

export default RatingList;
