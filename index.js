const express = require('express')
const hbs = require('hbs')

const app = express()
const port = 8000

app.use(express.static('public'))
app.set('view engine' , 'hbs')


app.get('/',(req,res)=>{
    res.render("home")

})

app.listen(port , ()=>{
    console.log(`The app is running at ${port}`) 
})