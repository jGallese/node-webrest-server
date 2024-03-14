import express from 'express';
import path from 'path';

interface Options {
  port: number;
  public_path?: string;
}
export class Server {

  private readonly port:number;
  private readonly publicPath:string;

  constructor(options: Options) {

    const {port, public_path = 'public'} = options;
    this.port = port;
    this.publicPath = public_path;
  }
  private app = express();

  async start( ) {

  //* Middlewares => funciones que se ejecutan en todo momento que se pase por una ruta

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