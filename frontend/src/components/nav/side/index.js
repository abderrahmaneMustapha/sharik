import React, { useState, useRef } from "react";
import { Avatar, Button, Box, Drop, Nav, Stack, Sidebar } from "grommet";

import { Book, Home, Heroku, Notification, Contact } from "grommet-icons";

const src = "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80";

const NotificationIcon = () => (
  <Stack anchor="top-right">
    <Notification />
    <Box background="accent-1" pad="xsmall" round responsive={false} />
  </Stack>
);

const NotificationAlert = () => {
  const ref = useRef();
  const [over, setOver] = useState();
  return (
    <Box alignSelf="center">
      <Button
        onFocus={() => setOver(true)}
        onBlur={() => setOver(false)}
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        icon={<NotificationIcon />}
        ref={ref}
      />
      {ref.current && over && (
        <Drop
          align={{ left: "right" }}
          overflow="hidden"
          plain
          target={ref.current}
        >
          <Box
            animation="jiggle"
            background="accent-1"
            round={{ corner: "left" }}
            pad="small"
            margin={{ vertical: "small" }}
            overflow="hidden"
          >
            Whats new !
          </Box>
        </Drop>
      )}
    </Box>
  );
};

const SidebarFooter = (props) => (
  <Box>
   
    {props.type === "profile" ? <Avatar margin="small" src={src} /> : undefined}
  </Box>
);

const SidebarHeader = () => (
  <Box pad="small">
    <Avatar
      background="linear-gradient(#6BCB9B 0%, #76BC4E 100%)"
      border={{ color: "white", size: "small" }}
      round="medium"
    >
     <Heroku />
    </Avatar>
  </Box>
);

const iconsMap = (color) => [
  
  <Home color={color} />,
  <Book color={color} />,
  <Contact color={color} />,
];
const SidebarButton = ({ iconName, index }) => {
  const [over, setOver] = useState();
  const tooltipColor = { color: "accent-1", opacity: 0.9 };

  const ref = useRef();
  return (
    <Box fill="horizontal">
      <Button
        ref={ref}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onFocus={() => setOver(false)}
        onBlur={() => setOver(false)}
        hoverIndicator={tooltipColor}
        plain
      >
        {({ hover }) => (
          <Box pad={{ vertical: "small" }} align="center">
            {iconsMap(hover ? "black" : "brand")[index]}
          </Box>
        )}
        
      </Button>
      {ref.current && over && (
        <Drop align={{ left: "right" }} target={ref.current} plain>
          <Box
            animation="slideRight"
            margin="xsmall"
            pad="small"
            background={tooltipColor}
            round={{ size: "medium", corner: "right" }}
          >
            {iconName}
          </Box>
        </Drop>
      )}
    </Box>
  );
};

export const TooltipsSidebar = (props) => (
  <Box direction="row"  >
    <Sidebar
      overflow="auto"
      background="white"
      header={<SidebarHeader />}
      footer={<SidebarFooter type={props.type} />}
      pad="none"
      height={{ min: "100%" }}
      fixed={true}
    >
      <Nav fixed={true}>
        {["Home", "About us", "Contact us"].map((iconName, index) => (
          <SidebarButton key={iconName} iconName={iconName} index={index} />
        ))}
        <NotificationAlert />
      </Nav>
    </Sidebar>
  </Box>
);
