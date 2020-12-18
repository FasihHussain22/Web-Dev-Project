const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let users = [{
        username: 'user1',
        password: 'test',
        userData: [{
                key: '1',
                listName: 'List 1',
                tasks: [{
                        key: 'a',
                        desc: 'Task 1',
                        status: false
                    },
                    {
                        key: 'b',
                        desc: 'Task 2',
                        status: true
                    }
                ]
            },
            {
                key: '2',
                listName: 'List 2',
                tasks: [{
                        key: 'a',
                        desc: 'Task 1',
                        status: true
                    },
                    {
                        key: 'b',
                        desc: 'Task 2',
                        status: false
                    }
                ]
            }
        ]
    },
    {
        username: 'user2',
        password: 'test',
        userData: [{
            key: '1',
            listName: 'List 1',
            tasks: [{
                    key: 'a',
                    desc: 'Task 1'
                },
                {
                    key: 'b',
                    desc: 'Task 2'
                }
            ]
        }]
    }
];

// Check user credentials
app.post('/login-user', (req, res) => {
    let data = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === data.username && users[i].password === data.password) {
            res.send({ status: 1 }); // login granted
            console.log('User Login');
            return;
        }
    }
    res.send({ status: 0 }) // login denied
});

// Add a new user to system
app.post('/register-user', (req, res) => {
    let data = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === data.username) {
            res.send({ status: 0 });
            return;
        }
    }
    users.push({ username: data.username, password: data.password, userData: [] });
    res.send({ status: 1 });
    console.log('User Registered');
});

// Get data for a user
app.post('/get-data', (req, res) => {
    let data = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === data.username) {
            res.send({ status: 1, data: users[i].userData });
            console.log('Data Accessed');
            return;
        }
    }
    res.send({ status: 0, data: [] });
});

// Add list for a user
app.post('/add-list', (req, res) => {
    let data = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === data.username) {
            users[i].userData.push({ key: data.listKey, listName: data.listName, tasks: [] });
            res.send({ status: 1 });
            console.log('List Created');
            return;
        }
    }
    res.send({ status: 0 });
});

// Delete list for a user
app.post('/delete-list', (req, res) => {
    let data = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === data.username) {
            for (let j = 0; j < users[i].userData.length; j++) {
                if (users[i].userData[j].key === data.listKey) {
                    users[i].userData.splice(j, 1);
                    res.send({ status: 1 });
                    console.log('List Deleted');
                    return;
                }
            }
        }
    }
    res.send({ status: 0 });
});

// Add task to the given list
app.post('/add-task', (req, res) => {
    let data = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === data.username) {
            for (let j = 0; j < users[i].userData.length; j++) {
                if (users[i].userData[j].key === data.listKey) {
                    users[i].userData[j].tasks.push({ key: data.taskKey, status: false, desc: data.task });
                    res.send({ status: 1 });
                    console.log('Task Added');
                    return;
                }
            }
        }
    }
    res.send({ status: 0 });
});

// Delete task from the given list
app.post('/delete-task', (req, res) => {
    let data = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === data.username) {
            for (let j = 0; j < users[i].userData.length; j++) {
                if (users[i].userData[j].key === data.listKey) {
                    for (let k = 0; k < users[i].userData[j].tasks.length; k++) {
                        if (users[i].userData[j].tasks[k].key === data.taskKey) {
                            users[i].userData[j].tasks.splice(k, 1);
                            res.send({ status: 1 });
                            console.log('Task Deleted');
                            return;
                        }
                    }
                }
            }
        }
    }
    res.send({ status: 0 });
});

// Update task status
app.post('/update-task', (req, res) => {
    let data = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === data.username) {
            for (let j = 0; j < users[i].userData.length; j++) {
                if (users[i].userData[j].key === data.listKey) {
                    for (let k = 0; k < users[i].userData[j].tasks.length; k++) {
                        if (users[i].userData[j].tasks[k].key === data.taskKey) {
                            users[i].userData[j].tasks[k].status = data.status;
                            res.send({ status: 1 });
                            console.log('Task Updated');
                            return;
                        }
                    }
                }
            }
        }
    }
    res.send({ status: 0 });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});