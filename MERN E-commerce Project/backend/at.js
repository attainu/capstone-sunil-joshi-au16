

app.post('/insert' , (req, res)=>{
    res.sendFile(path.join(__dirname, '/cities.json'))
})