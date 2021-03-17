import { FormEvent, useState, useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import api from './config/api'
import credentials from './config/credentials.json'
import './App.css';


const columns = [
  { field: 'Database', headerName: 'Database', width: 220 },
  { field: 'Schema', headerName: 'Schema', width: 200 },
  { field: 'Table', headerName: 'Table', width: 200 },
  { field: 'Column', headerName: 'Column', width: 200 },
  { field: 'DataType', headerName: 'DataType', width: 200 },
];

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])

  async function connect(){
    const result = await api.post('credentials',credentials)
    setIsConnected(true)
    alert(result.data)
  }

  async function disconnect(){
    const result = await api.get('credentials')
    setData([])
    setIsConnected(false)
    alert(result.data)
  }
  async function handleSearch(event: FormEvent){
    event.preventDefault()
    setIsSearching(true)
  }

  useEffect(() => {
    if (isSearching) {
      api.get(`credentials/${search}`).then(resolve => {
        setData(resolve.data)
        setIsSearching(false)
      })
    }
  }, [isSearching, data, search]);

  return (
    <div className="App">
      <header>
        { 
          (isConnected) ? (
            <div>
                <form onSubmit={handleSearch}>
                  <input value={search} onChange={event => setSearch(event.target.value)}/>
                </form>
              
              <button onClick={disconnect} className={"button button-disconnect"}>Disconnect</button>
            </div>
            
          ) : (
            <button onClick={connect} className="button button-connect">Connect</button>
          )
        }
        
        
      </header>
      {
        (data.length > 0) ? (
          <div style={{ height: 590, width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={8} getRowId={(row) => row._id} />
          </div>
        ) : (
          <div></div>
        )
      }

    </div>
  );
}

export default App;
