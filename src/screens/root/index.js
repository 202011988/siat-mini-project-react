import React from "react";
import Box from "@mui/material/Box";
import {Grid, List, ListItemButton, ListItemText} from "@mui/material";
import TodoApp from "../main";

const RootScreen = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Grid container flexDirection='column'>
            <Grid item>
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemText primary="project 1"/>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemText primary="project 2"/>
                </ListItemButton>
            </List>
        </Box>
                <Grid item xs={12}>
                    <TodoApp projectId={selectedIndex} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RootScreen