import React from "react";
import Box from "@mui/material/Box";
import {Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import {PostAdd} from "@mui/icons-material";
import TextField from "@mui/material/TextField";

const items = [{
    id: 0, name: 'project1'
}, {
    id: 1, name: 'project2'
}, {
    id: 2, name: 'project3'
}]

const RootScreen = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [isAdding, setIsAdding] = React.useState(false)
    const [newProjectName, setNewProjectName] = React.useState('')
    const [projects, setProjects] = React.useState(items)


    const navigate = useNavigate();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        navigate('/projects/' + index)
    };

    const handleInputChange = (event) => {
        setNewProjectName(event.target.value);
    }

    const handleAddProjectClick = () => {
        setIsAdding(true)
    }

    const handleInputBlur = () => {
        setIsAdding(false)
        setNewProjectName('')
    }

    const handleInputKeyDown = event => {
        if ('enter' === event.key.toLowerCase()) {
            setProjects(v => [...v, {id: v.length, name: newProjectName}])
            setNewProjectName('')
            setIsAdding(false)
        }
    }

    // test
    console.log("rendering")

    return (
        <Grid container flexDirection='column'>
            <Grid item>
                <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    <List component="nav" aria-label="secondary mailbox folder">
                        {
                            projects.map(({id, name}) => (
                                <ListItemButton
                                    selected={selectedIndex === id}
                                    onClick={(event) => handleListItemClick(event, id)}
                                    key={id}
                                >
                                    <ListItemText primary={name}/>
                                </ListItemButton>
                            ))
                        }
                        <ListItem>
                            {
                                isAdding?
                            <TextField
                                value={newProjectName}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                onKeyDown={handleInputKeyDown}
                                autoFocus
                            />
                                    :
                            <ListItemText primary={<PostAdd/>} onClick={handleAddProjectClick}/>
                            }
                        </ListItem>
                    </List>
                </Box>
                <Grid item xs={12}>
                    <Outlet/>
                    {/*<Outlet context={selectedIndex} />*/}
                    {/*<TodoApp projectId={selectedIndex} />*/}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RootScreen