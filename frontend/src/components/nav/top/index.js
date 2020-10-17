import React from "react";
import { Logout, Notification } from "grommet-icons";
import { Anchor, Nav, Header, DropButton } from "grommet";
import { NotificationDropContent } from "../../buttons/index";
function TopNav(props) {
    return (
        <Nav direction="row" alignContent="end"  full fill={"horizontal"} justify="end">
            {props.DropButton}
            {props.items.map((item) => (
                <Anchor  margin={{right: "10px"}} href={item.href} label={item.label} key={item.label} alignSelf="center" />
            ))}
            
        </Nav>
    );
}

export function TopRightNav() {
    const items = [{ label: <Logout />, href: "/logout" }];
    const [open, setOpen] = React.useState();
    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <Header background="white" pad="small">
            <TopNav
                items={items}
                DropButton={
                    <DropButton
                        label={<Notification />}
                        open={open}
                        onOpen={onOpen}
                        onClose={onClose}
                        margin={{left:"auto"}}
                        dropContent={
                            <NotificationDropContent onClose={onClose} />
                        }
                        dropProps={{ align: { top: "bottom" } }}
                    />
                }
            />
        </Header>
    );
}
