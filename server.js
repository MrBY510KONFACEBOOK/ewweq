const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/execute', (req, res) => {
    const command = req.body.command;

    // تحديد مسار powershell.exe بشكل صريح
    exec(`powershell.exe -command "${command}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            res.status(500).send(error.message);
            return;
        }

        const output = stdout || stderr;
        console.log(`Command output: ${output}`);
        res.send(output);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
