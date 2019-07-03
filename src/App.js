import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import vista from './vistaDemo';

import TableView from 'react-table-view'


export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      valor: 'este es el valor original',
      cambioVista : false,
      texto:'ejemplo 1',
      data1: [],
    }
  }

  async componentDidMount(){
    await fetch('http://localhost:8888/crudPHP/index.php/API/getAllUsers')
    .then(result=>result.json())
    .then((data) => {
        console.log(data);
        this.setState({
          texto: JSON.stringify(data),
          data1: data,
        })
    },
    (error) => {
      console.log('== error' + error);
    });
    
  }
  componentWillMount(){

  }

  eventoDelBoton(){
    //alert('se dió click');
    this.setState({
      valor: 'este valor es nuevo',
      cambioVista: true,
    });
  }

  eventoDelBoton2(){
    //alert('se dió click');
    this.setState({
      valor: 'valor desde el botón',
      cambioVista: false,
    });
  }

  render(){


    const DATA = [
      { id: 0, make: 'Honda', model: 'NSX', year: '1997' },
      { id: 1, make: 'Toyota', model: 'Supra', year: '1996' },
      { id: 2, make: 'Nissan', model: '300ZX', year: '1998' }
    ]
    /* define the look of each column, OPTIONAL */
    let COLUMNS = {
      make: function(data) {
        return <span>What an awesome year: {data.year}</span>
      },
      model: function(data) {
        return <a>{data.model}</a>
      },
      year: function(data) {
        return (
          <p style={{textAlign: 'left', margin: '0 4px'}}>
            {`Id: ${data.id}`}
            <br />
            {`Year: ${data.year}`}
          </p>
        )
      }
    }


    if(this.state.cambioVista == false){
      return(
        <div>
          <input value={this.state.valor}></input>
          <br></br>   
          <button onClick={this.eventoDelBoton.bind(this)}>alerta General</button>
          <br></br>
          <h5>hola{this.state.texto}</h5>
          <TableView data={DATA} columns={COLUMNS} />
        </div>
      );
    }else{
      return(
        <div>
          <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR4AAACwCAMAAADudvHOAAAAdVBMVEX3+PijxDn8+/+ewSb5+fuhwzDF2I6gwivl7dTx9Ovf6cfs8eDz9fCiwzXs8uOlxT/c5r7L3JucwB6xzF/B1ofn7tWtylWqyEzJ25jO3qS9033W47S1z2rx9OjR4Krj68y+1IC40XK60naZvg/Z5bmvy1usyVGt76y4AAAE3UlEQVR4nO2da3eyOhBG42QiXoiXgKIVtRfr//+JB1QEejBa6Vtr8uyP1MUy2yGXYZIKAQAAAAAAAAAAAAAAAAAAAAAAAIA/D/NPfchFeDO43nRarTz1EyodXms6rz80/cq3+XPQ0nSvNZ3ezM7T6BGszNredp6Zua92BO/Muz186NNsvdUjeG5mZeu54HyFBh+Rpz1PDm/NsfnMxKI/7G2329koFERHRZzIob/Bk4VHZLLBnak/6KbjQB4JknQxCDNDtDKvHgdPFh5Dk1C4igKptO4UaK2kSidCaNn3OXiy8OnKVMnSTImWnVQuvQ4eQet31eTmZEjFocd+WEyNuignR6kN+fp40WgfWOXkyNTT7od2jX3O/wJIbn18wGhqbpCT90By5Z8fim+0k2G8G8BoIW+2k3VAnsUPbYrYUfJiD6SlLMY1M/DJD/eK2Ani3iRp9qM+B72XYmgLRv6MXxx2TkZUTMxh4/Cuk3yh+naKH/3pjx6KCyGmx3lGsCl8MnOZyEnxSX/WFzw7D1pykjWa5o1rrrf8T5tzZHmzOqXorEMna6JN8yAW7IiGnfNHlSe5jUrwZH466eellUUQpdX1arB+9Df/Fei9tgzVlhV77U/Bwovw6dsX6ZdRPujh1Xfmy1W8eGnRPIzfFD1XXxo6AF3P8VzAh6khj25fqX/V03F/6sODe7uebGbo/kuvyjz4+3puKHh5cmhx77iep33c19M1wb2YjZt6mOj82jzs309Y3s2h9zs0XET7dNk/VhvQ/RyU0GgaJdF05MokiLoy0FoHKs8Y8yzu3kucj1y0DA53CxxJANFLMZR/bCgb2D/UveTJs6zvOt3teuXdM8CTch6YTVxazXt6zL3ybodU47NDlUy7eqWWeiqptI5Knz98eFTRocftZs09Dqvr2et1v3+e8p3N4QcPW+oZVufc8vnzh/9Uz+jRrWsN9FiBHivQYwV6rECPFeixAj1WoMcK9Fj5t3qw5oIe6IGeZqDHCvRYgR4r0GMFeqxAjxXosQI9VqDHCvRYgR4r0GMFeqzU9QTIFtbhYVWHDqmdnnW1rjVwoQy80iCdti1/qlYL6f2jm/YDULd8HuSktZ7K1kG5ef7yJyHCcfGDBym1LX8SYl5Eo9o78GjlJzOOg1yQlpHg1no4nMvj3ebPXxt2gMPp2Bi5X+VnyrWOHuZlYoxJNu4cpkpiPewfm9NaTy4ov5sL/U5J8VP/gJ7K3ZzjZ/Q4C/RYqZa1f1uP+7sBhbh/L+n40V/9F6CXe7cDBk7sMbkC9y3HQliDRz/6q/8K3JP3xI/SPvQ8Il9lpFLme0NVXZM6bRltuiqDNxeyFzfBNFxNc+pnsUxPLKoPn4oP13YjhzaPXoWPO0ontc1MxY5RUcsIzg6bSN1ZYN0O1/UUl2tHrXkwFbwE9FiBHivQYwV6rECPFeixAj1WoMfKTXp8OI2vGeixAj1WoMfKFz2FB3TNR+pHE+/PmeRxJeFjPMkRNlIRUZ43THGZJdNjD9Lvl6BppVqnX1ytFpQZ948qtMDR+VD9XRkm5X+xkO8+2xEs3o06nCM3qT5EtDmcVadM7LWdPCvfe50n0fJLKRP1p1Eyj4cedzwnjkn55quexw4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcIf/ALq9UKN7P0+gAAAAAElFTkSuQmCC'></img>
          <button onClick={this.eventoDelBoton2.bind(this)}>click</button>
        </div>
      );
    }
    
  }

}



