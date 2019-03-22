const Joi = require('joi');
const express= require ('express');
const app= express();
// app has 4 methods{get,post,put,del}.

app.use(express.json());

const volunteers= [
    { id: 1, name: 'Hagr', age: 22 },  
    { id: 2, name: 'Aalaa', age:21 },  
    { id: 3, name: 'Yomna', age:20 }, 
    { id: 4, name: 'Toka', age:23 }, 
    { id: 5, name: 'Asmaa', age:20 }, 
    { id: 6, name: 'Somya', age:21 }, 
    { id: 7, name: 'Sara', age:22 }, 
];

//incoming Request
app.get('/api/IEEE_TSB', (req ,res) => {
    res.send('Blue suits us');
});

app.get('/api/IEEE_TSB/volunteers', (req ,res) => {
    res.send(volunteers);
});

app.get('/api/IEEE_TSB/volunteers/:id', (req, res) =>{
    //res.send(req.query);
    const volunteer = volunteers.find(c => c.id===parseInt(req.params.id));
    if(!volunteer) return res.status(404).send('the volunteer with the given id was not found');
    res.send(volunteer);
 });

app.post('/api/IEEE_TSB/volunteers', (req, res) => {
    const {error} =validateVolunteer(req.body); //error=result.error
    if (error) return res.status(400).send(error.details[0].message);

    //create new volunteer in volunteers
    const volunteer={id: volunteers.length+1, 
                     name:req.body.name,
                     age:req.body.age};
    volunteers.push(volunteer);  
    res.send(volunteer)
});

app.put('/api/IEEE_TSB/volunteers/:id', (req, res) =>{
//look up the volunteer
 //if not existing, return 404
 const volunteer = volunteers.find(c => c.id===parseInt(req.params.id));
 if(!volunteer) return res.status(404).send('the Volunteer with the given id was not found');
    //validate?
    //if not validate, return 400 -bad request
    const {error} =validateVolunteer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //update
    volunteer.name=req.body.name;
    volunteer.age=req.body.age;
    //return the updated volunteer.
    res.send(volunteer);
});

function validateVolunteer(volunteer){
    const schema ={
        name:Joi.string().min(2).required()
     };
    return Joi.validate(volunteer, schema);
}

app.delete('/api/IEEE_TSB/volunteers/:id', (req, res) =>{
    //look up the volunteer
    //not existing, return 404
    const volunteer = volunteers.find(c => c.id===parseInt(req.params.id));
    if(!volunteer) return res.status(404).send('the volunteer with the given id was not found');

    //delete
    const index = volunteers.indexOf(volunteer);
    volunteers.splice(index,4);
    res.send(volunteer);
});

const port=process.env.port||2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
