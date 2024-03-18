import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}
export class Server {
  
  private app = express();
  private readonly port:number;
  private readonly publicPath:string;
  private readonly routes: Router;

  constructor(options: Options) {

    const {port, routes, public_path = 'public'} = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes
  }
  

  async start( ) {

  //* Middlewares => funciones que se ejecutan en todo momento que se pase por una ruta
  this.app.use( express.json() ); // permite raw
  this.app.use( express.urlencoded({ extended: true}) ); // permite x-form-urlencoded

  //* Routes
  this.app.use(this.routes)


  //* Public Folders
    this.app.use(express.static(this.publicPath));



    this.app.get('*', (req,res) => {
      const indexPath = path.join( __dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
      return;
    })

    this.app.listen(this.port, ()=> {
      console.log(`server running on port ${this.port}`);
    })
  }
}