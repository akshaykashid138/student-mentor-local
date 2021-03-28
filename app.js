const express=require("express")
const app=express()

let students=[
    {id:1,name:"akshay", email:"akshay@gmail.com",mentor:""}
]

let mentors=[
    {id:1,name:"akshay", email:"akshay@gmail.com", students:[]}
]

app.use(express.json())
//get Student
app.get("/students",(req,res)=>{
    res.send(students)
})


//add student
app.post("/addStudent",(req,res)=>{
    const student={
        id:students.length+1,
        name:req.body.name,
        email:req.body.email
    }
    students.push(student)
    res.send(student)
})


//add mentor
app.post("/addMentor",(req,res)=>{
    const mentor={
        id:mentors.length+1,
        name:req.body.name,
        email:req.body.email,
        students:[]
    }
    mentors.push(mentor)
    res.send(mentor)
})

//get mentor
app.get("/mentors",(req,res)=>{
    res.send(mentors)
})

//assign students to mentor
app.put('/mentor/addStudent/:id',async function(req,res){
    
    const mentor= await mentors.find(m => m.id===parseInt(req.params.id))
    if(!mentor) res.send(`mentor not found with given id: ${req.params.id}`)
   
    student=  {
        id:mentor.students.length++,
        name:req.body.name,
        email:req.body.email
    }
   
    await mentor.students.push(student)
     console.log("student",student)
     console.log("mentor",mentors)
    res.send(student)
   
})


//update student
app.put('/students/:id',(req,res)=>{
    const student=students.find(s=>s.id===parseInt(req.params.id))
    if(!student) res.status(404).send("The student with the given ID was not found")

    
    student.name=req.body.name;
    student.email=req.body.email
    res.send(student)
})

//delete student
app.delete('/students/:id',(req,res)=>{
    const student=students.find(s=>s.id===parseInt(req.params.id))
    if(!student) res.status(404).send("The student with the given ID was not found")

    const index=students.indexOf(student)
    students.splice(index, 1)

    res.send(student)
})

app.listen(4000)