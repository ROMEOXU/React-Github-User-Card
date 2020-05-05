import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state={
     data:'',
     followers:[],
     nameText:'',
     error:''
    };
  }
  handleChange = (e)=>{
  this.setState({nameText:e.target.value})
  }
  handleSearch =(e)=>{
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.nameText}`)
    .then(res=>{this.setState({data:res.data,error:''
    })})
    .catch(err=>this.setState({error:'no name matched'}))
}
  componentDidMount(){
   axios.get('https://api.github.com/users/romeoxu')
   .then(res=>{console.log('cdm',res.data);
    this.setState({data: res.data})})
   .catch(err=>console.log(err))
  }
  componentDidUpdate(prevProps,prevState){
    if (prevState.data !== this.state.data){
    axios.get(`https://api.github.com/users/${this.state.nameText}/followers`)
    .then(res=>{console.log('cdu',res);
  this.setState({followers:res.data})})
  .catch(err=>console.log(err))
  }
}

  render(){
  return (
    <div className="App">
     <h3> userCard-lifecycle method</h3>
     <input type='text' value={this.state.nameText} onChange={this.handleChange}/>
     <button onClick={this.handleSearch}>Search</button>
     {this.state.error && <p>{this.state.error}</p>}
      <div>github name:{this.state.data.login}</div>
      <div className='box'>
      <img src ={this.state.data.avatar_url} />
      github followers:
      {this.state.followers.map(f=>(
        <img src={f.avatar_url} />
      ))}
      </div>
    </div>
  );}
}

export default App;
