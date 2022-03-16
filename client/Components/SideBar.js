import React from 'react';
import { Link, Route, Routes } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 7,
  px: 9,
};

const SideBar = () => {
  // test value
  const user = null;
  const categories = [
    {
      id: 'SDI Topics',
      children: [
        {
          id: 'Twitter',
          icon: <PeopleIcon />,
          active: true,
        },
        { id: 'Uber/Lyft', icon: <DnsRoundedIcon /> },
      ],
    },
  ];

  return (
    <Drawer variant="permanent">
    <List disablePadding>
      <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
        QuizDI
      </ListItem>
      {categories.map(({ id, children }) => (
        <Box key={id} sx={{ bgcolor: '#101F33' }}>
          <ListItem sx={{ py: 2, px: 9 }}>
            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
          </ListItem>
          {children.map(({ id: childId, icon, active }) => (
            <ListItem disablePadding key={childId}>
              <ListItemButton selected={active} sx={item}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{childId}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </List>
  </Drawer>
  )
}

export default SideBar;