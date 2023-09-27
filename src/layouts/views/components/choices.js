import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import SoftTypography from 'components/SoftTypography';
import { capitalize } from 'utils';

function AnswerList(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={handleToggle}>
        {isOpen ? 'Hide Answers' : 'Show Answers'}
      </Button>

      <Collapse in={isOpen}>
        <List>
          {
            Object.keys(props.answers).map(key => (
              <ListItem key={key}>
                <ListItemText>
                  <SoftTypography variant="h6" component="span" >
                    {capitalize(props.answers[key])}
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

export default AnswerList;
