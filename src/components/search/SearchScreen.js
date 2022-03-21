import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hook/UseForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import  queryString  from 'query-string';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q='' } = queryString.parse(location.search);
  

  const [ formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const {searchText} = formValues;

  const heroesFilters =useMemo(()=>{getHeroesByName(q)}, [q]);

  const handleSearch = (e)=>{
    e.preventDefault();
    navigate(`?q=${ searchText }`);

  }

  return (
    <>
        <h1>Busqueda</h1>    
        <hr />

        <div className='row'>
          <div className='col-5'>
            <h4>Buscar</h4>
            <hr/>

            <form onSubmit={handleSearch}>
              <input 
                type="text"
                placeholder='Busca un heroe'
                className="form-control"
                name="searchText"
                autoComplete='off'
                onChange={handleInputChange}
                value={searchText}
              />

              <button
                className='btn btn-outline-primary mt-1'
                type='submit'
                onClick={handleSearch}
              >
                Buscar

              </button>
            </form>
          </div>
          <div className='col-7'>
            <h4>Resultado</h4>
            <hr/>
            {
              (q==='')
              ? <div className='alert alert-info'>Busca un heroe</div>
              : (heroesFilters.length === 0) 
                && <div className='alert alert-danger'>No hay resultados: { q }</div>
            }

            {
              heroesFilters.map(hero =>(
                <HeroCard
                  key = {hero.id}
                  {...hero}
                />
              ))
            }
          </div>

        </div>
    </>
  )
}
