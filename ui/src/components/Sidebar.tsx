import React from "react";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SvgIcon from '@mui/material/SvgIcon';


import Wallet from "./Wallet";
import WalletSub from "./WalletSub";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function Sidebar() {
  return (
    <>
       <nav aria-label="main mailbox folders">
        <List>
          <Link to="/alltrack">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon color="" />
                </ListItemIcon>
                <ListItemText primary="AllImage" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/mytrack">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="MyImage" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/trackupload">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding className="flex flex-col">
            <Wallet />
          </ListItem>
        </List>
      </nav>
    </>
  );
}