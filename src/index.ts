import express, { Express, Request, Response } from 'express';
import { Task,Status } from './models/models';


const app: Express = express();
const port = 3000;
app.use(express.json())
let storage:Task[] = [];
storage.push(new Task("Task",Status.InProgress))

app.get('/', async(req: Request, res: Response) => {
  res.json({message:storage});
});

app.get('/:id', async(req: Request, res: Response) => {
  const id = +req.params.id
  if(!id) return res.status(400).send()
  const task =storage.find(task =>task.id === id)
  task ? res.json({task}) : res.json({msg:`Task with ID ${id} not found`}) ;
  
});

app.post('/', async(req: Request, res: Response) => {
  const {name,status} =req.body
  if(!name  || !status ) return res.status(400).send()

  const task:Task = new Task(name,status)
  storage.push(task)


  if(storage.find((res) =>{
    return res.id === task.id
  })){
    task.name = name
    task.status = status
    return res.json("URA");
  }else{
    return res.json("create error");
  }

  
});

app.delete('/:id', async(req: Request, res: Response) => {
  const id = +req.params.id
  if(!id) return res.status(400).send()
  let num =-1
  storage = storage.filter((task,i) =>{
    if(task.id === id){
      num = i
      return false
    }else return true

  })
  num>-1 ? res.json({msg:`Task with ID ${id} deleted`}) : res.json({msg:`Task with ID ${id} not found`}) ;
  
});

app.put('/:id', async(req: Request, res: Response) => {
  const {name,status} =req.body
  if(!name || !status || !req.params.id ) return res.status(400).send()

  let index:number=-1;
  let task = storage.find((task,i) =>{
    index = i
    return task.id === +req.params.id
  })

  if(task){
    task.name = name
    task.status = status
    return res.json({updatedTask:storage[index]});
  }else{
    return res.json("update error");
  }

});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});