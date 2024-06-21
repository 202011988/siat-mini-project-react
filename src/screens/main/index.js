import React, {useEffect, useState} from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import {useParams} from "react-router-dom";

const items = {
    0 : [ // 이 숫자는 projectId 이고
        'task 1', // 이 이름은 task 1 인데, 나중에 { id: 1, name: 'task 1' } 으로 전환할 예정
        'task 2'
    ],
    1 : [
        'task 3',
        'task 4',
        'task 5',
    ],
    2 : [
        'task 6',
    ]
}

const TodoApp = () => {
    const [tasks, setTasks] = useState(items);
    const [newTask, setNewTask] = useState('');

    // const projectId = useOutletContext(); // root -> this (context: selectedIndex)
    const {projectId} = useParams();

    useEffect(() => {
        // TODO: get tasks from the project
    }, []);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim()) {
            setTasks((prevTasks) => {
                // TODO: insert a task
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