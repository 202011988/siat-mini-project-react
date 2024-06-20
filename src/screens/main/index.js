import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const items = {
    0 : [
        'task 1',
        'task 2'
    ],
    1 : [
        'task 3',
        'task 4',
        'task 5',
    ]

}

const TodoApp = ({projectId}) => {
    const [tasks, setTasks] = useState(items);
    const [newTask, setNewTask] = useState('');

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim()) {
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                const projectTasks = updatedTasks[projectId] || [];
                updatedTasks[projectId] = [...projectTasks, newTask.trim()];
                return updatedTasks;
            });
            // setTasks([...tasks, newTask.trim()]);
            setNewTask('');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                TODO App
            </Typography>
            <TextField
                label="New Task"
                value={newTask}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addTask}>
                Add Task
            </Button>
            <List>
                {tasks[projectId].map((task, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={task} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoApp;