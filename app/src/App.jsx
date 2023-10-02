import { useState, useEffect } from 'react';
import styled from 'styled-components'
import SearchResult from './components/SearchResult';

export const DATA_URL = "http://localhost:9000"
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredArray, setFilteredArray] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");
  
    useEffect(()=>{
      setLoading(true);
      const fetchingData = async() =>{
        try {
          const response = await fetch(DATA_URL);
        const json = await response.json();
        setData(json);
        setFilteredArray(json);
        setLoading(false);
        // console.log(json);
        } catch (error) {
          setError("Error Fetching Data");
          setLoading(false);
        }
      }
      fetchingData();
    }, [])

    const handleChange = (e) =>{
      const searchValue = e.target.value;

      console.log(searchValue);

       if(searchValue===''){
         setFilteredArray(null);
       }
       const filter = data?.filter((food)=>
         food.name.toLowerCase().includes(searchValue.toLowerCase())
       )
       setFilteredArray(filter);
       
     }

     const filterFood = (type) => {
      if (type === "all") {
        setFilteredArray(data);
        setSelectedBtn("all");
        return;
      }
  
      const filter = data?.filter((food) =>
        food.type.toLowerCase().includes(type.toLowerCase())
      );
      setFilteredArray(filter);
      setSelectedBtn(type);
    };
     
    // console.log(data[0].image);
  if(error!=null && loading==false) return <h1>{error}</h1>
  if(loading) return <h1>loading....</h1>
  return <>
    <Container>
    <TopContainer>
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="search">
        <input onChange={handleChange} placeholder='Search Food' />
      </div>
    </TopContainer>
    <FilterContainer>
        <Button onClick={()=> filterFood('all')}>All</Button>
        <Button onClick={()=> filterFood('breakfast')}>Breakfast</Button>
        <Button onClick={()=> filterFood('lunch')}>Lunch</Button>
        <Button onClick={()=> filterFood('Dinner')}>Dinner</Button>
    </FilterContainer>
  </Container>
  <SearchResult data={filteredArray}/>
  </>
};
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 31px;
`
export const Button = styled.div`
  background: #FF4343;
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`

const TopContainer = styled.div`
  display: flex;
  min-height: 140px;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  .search{
    input{
      background-color: transparent;
      color: white;
      border-radius: 5px;
      height: 40px;
      border: 1px solid #FF0909;
      font-size: 16px;
      font-weight: 400;
      padding: 0 10px;
    }
  }
`
export default App;
