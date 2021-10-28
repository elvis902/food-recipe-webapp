import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'
import RecipeTitle from './RecipeTitle';

function App() {

  const APP_ID = "enter_your_app_id"
  const APP_KEY = "enter_your_app_key"
  
  const [query, setQuery] = useState("chicken")
  const [recipes, setRecipes] = useState([])
  const [healthLabel, setHealthLabel] = useState("alcohol-free")
  const url = `https://api.edamam.com/api/recipes/v2/?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=${healthLabel}`
  const getRecipe = () => {
     axios.get(url)
     .then(response => {
       setRecipes(response.data.hits);
     })
     .catch(error => {
       console.log(error)
     });
  }

  const onSubmit = (e) => {
    e.preventDefault()
    getRecipe();
  }

  useEffect(()=>{
    getRecipe();
  }, [])

  return (
    <div className="app">
       <h1>Food Recipe Plaza</h1>
       <form className='app__form' onSubmit={onSubmit}>
          <input
              className='app__formInput'
              placeholder='enter ingredient'
              type='text'
              value={query}
              onChange={(e) => {setQuery(e.target.value)}}
          />
          <input  className='app_formSubmit' type='submit' value='search'/>
          <select className='app__healthLabels' onChange={e => setHealthLabel(e.target.value)}>
              <option value="alcohol-free">
              alcohol-free
              </option>
              <option value="vegan" onClick={() => setHealthLabel("vegan") }>
                vegan
              </option>
              <option value="egg-free">
              egg-free
              </option>
              <option value="gluten-free">
              gluten-free
              </option>
              <option value="low-sugar">
              low-sugar
              </option>
              <option value="peanut-free">
              peanut-free
              </option>
              <option value="No-oil-added">
              No-oil-added
              </option>
              <option value="paleo">
              paleo
              </option>
              <option value="sugar-conscious">
              sugar-conscious
              </option>
              <option value="vegetarian">
              vegetarian
              </option>
              <option value="tree-nut-free">
              tree-nut-free
              </option>
          </select>
       </form>

       <div className='app__recipes'>
         { recipes.map( recipe => {
             return (
               <RecipeTitle recipe={recipe}/>
             ) 
            })}
        
       </div>
    </div>
  );
}

export default App;
