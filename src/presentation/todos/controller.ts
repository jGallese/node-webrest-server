import { Request, Response } from "express"

const todos = [
  {id:1, text: 'Buy Milk', createdAt: new Date()},
  {id:2, text: 'Buy bread', createdAt: null},
  {id:3, text: 'Buy butter', createdAt: new Date()},
];

export class TodosController {

  //*DI
  constructor() {}

  public getTodos = (req: Request, res: Response)=> {
    return res.json(todos);
    
  }

  public getTodoById = (req:Request, res: Response ) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json(({error: 'Id argument is not a number'}))

    const todo = todos.find(todo => todo.id === id);

    ( todo ) 
      ? res.json(todo)
      : res.status(404).json({error: `Todo With ${id} not found`})

  }

  public createTodo = (req:Request, res: Response) => {

    const { text } = req.body;

    if (!text) return res.status(400).json({error: 'text property is required'});

    const newTodo = {
      id: todos.length +1,
      text: text,
      createdAt: null
    }
    
    todos.push(newTodo);

    res.json( newTodo );
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({error: 'Id parameter is not an argument'});
    
    const todo = todos.find(todo => todo.id === id);
    if ( !todo ) return res.status(404).json({error: `Todo With ${id} not found`});
    
    const {text, createdAt} = req.body;
    if ( !text ) return res.status(400).json({error: `Text property is required`});

    todo.text = text || todo.text; //* si viene un text, lo pone, sino, deja el de antes.

    ( createdAt === null)
     ? todo.createdAt = null
     : todo.createdAt = new Date( createdAt || todo.createdAt)


    //! ojo, referencia


    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).json({error: 'Id parameter is not an argument'});

    const todo = todos.find( todo => todo.id === id);
    if (!todo) return res.status(404).json({error: `Todo with ID ${id} was not found`});
    
    
    const indexTodo = todos.findIndex(todo => todo.id === id);
    todos.splice(indexTodo, 1)
    res.json(todo);
  }
}