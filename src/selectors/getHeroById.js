import { heroes } from "../data/heroes"

export const getHeroById = (id= '')=>{
    console.log('get hero calkl');
    return heroes.find( hero=> hero.id === id);
}