import Axios from 'axios'
import {useState} from 'react'

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  
  const [employeeList, setEmployeeList] = useState([]);
  const getEmployee =() =>{
    Axios.get('http://localhost:3100/employee').then((response)=> {
      setEmployeeList(response.data)
    })
  }
  const addEmployee = () => {
    Axios.post('http://localhost:3100/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => { setEmployeeList([...employeeList, 
      {
        name: name,
        age: age,
        country: country,
        postition: position,
        wage: wage,
      },
    ])
      
    })
  }
  const updateEmployeeWage =(id) => {
    Axios.put('http://localhost:3100/update', {wage: newWage, id:id}).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            country: val.country,
            age: val.age,
            position: val.postition,
            wage: newWage
          } : val;
        })
      )
    })
  }
  const deleteEmployee =(id) => {
    Axios.delete(`http://localhost:3100/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id
        })
      )
    })
  }

  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <lable htmlFor="name" className="form-lable">Name</lable>
            <input type="text" className="form-control" placeholder="Enter Name"
              onChange={(event) => {setName(event.target.value)}} />
          </div>
          <div className="mb-3">
            <lable htmlFor="age" className="form-lable">Age</lable>
            <input type="text" className="form-control" placeholder="Enter Age" 
              onChange={(event) => {setAge(event.target.value)}}/>
          </div>
          <div className="mb-3">
            <lable htmlFor="country" className="form-lable">Country</lable>
            <input type="text" className="form-control" placeholder="Enter Country"   onChange={(event) => {setCountry(event.target.value)}}/>
          </div>
          <div className="mb-3">
            <lable htmlFor="Position" className="form-lable">Position</lable>
            <input type="text" className="form-control" placeholder="Enter Position"  onChange={(event) => {setPosition(event.target.value)}} />
          </div>
          <div className="mb-3">
            <lable htmlFor="wage" className="form-lable">Wage</lable>
            <input type="text" className="form-control" placeholder="Enter Wage" 
              onChange={(event) => {setWage(event.target.value)}}/>
          </div>
          <button className="btn btn-success" onClick={addEmployee}>Add Employee</button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className="btn btn-primary" onClick={getEmployee}>Show Employees</button>
        <br/>
        <br/>
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className='card-body text-left'>
                <p className='card-text'>Name: {val.name}</p>
                <p className='card-text'>Age: {val.age}</p>
                <p className='card-text'>Country: {val.country}</p>
                <p className='card-text'>Position: {val.postition}</p>
                <p className='card-text'>Wage: {val.wage}</p>
                <div className='d-flex'>
                  <input type='number' placeholder='15000...' className='form-control' style={{width:'300px'}}
                    onChange={(event) => {setNewWage(event.target.value)}}/>
                  <button className='btn btn-warning' onClick={() => {updateEmployeeWage(val.id)}}>Update</button>
                  <button className='btn btn-danger' onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                </div>
              </div>
            </div>
          )
          })
        }
      </div>
    </div>
  );
}

export default App;
