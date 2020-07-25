import React, { useEffect } from 'react';
import CountryTable from './CountryTable/countryTable';

import './app.css';
export interface props {
 name:string,
 
}

function App() {

  const [result, setResult] = React.useState<Array<object>>([]);
  const [loading,setLoading]=React.useState<boolean>(false);
  const [data,setData]=React.useState<Array<object>>(result);
  const [searchText, setSearchText] = React.useState<string>("");
  

   useEffect(() => {
     setLoading(true)
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(res => {
        setResult(res)
        setLoading(false)
      })
      .catch(err=>console.log(err))
  }, [])

 
 

  useEffect(()=>{
       const value=searchText;
       const filterProperty=["name","region","alpha2Code","alpha3Code"]
      const lowerCaseValue=value.toLowerCase().trim();
      if (lowerCaseValue===''){
        setData(result)
        console.log(result)
      }
      else{
        const filteredData=result.filter((item:any)=> {
           
          return Object.keys(item).some((key:any)=>
            filterProperty.includes(key)? item[key].toString().toLowerCase().includes(lowerCaseValue) :false)
        })
  
        setData(filteredData)
        
       console.log(filteredData);
      }
  
     
      

  },[searchText,result])
  
 
  if(loading){
    return <h1>Loading Countries Data...</h1>
  }

  return (
    <div>
              <div className="filter-div">
                <input  className="input" type="text" value={searchText} placeholder="Search" onChange={(e)=>setSearchText(e.target.value)} name="search-filter" />
              </div>
        <CountryTable Countries={data} />
        
    </div>
  );
}

export default App;
