//make a route where there is a search bar and a list of pokemon
//when you type in the search bar, the list of pokemon should filter
//when you click on a pokemon, it should take you to the pokemon page
//

import { createSignal, onMount, For } from "solid-js";
import { getCollection } from "astro:content";
export default function PokemonFinder() {
    const [pokemon, setPokemon] = createSignal([]);
    const [search, setSearch] = createSignal("");
    
    async function fetchPokemon  ()  {
        const work = await getCollection('work');
	    setPokemon((work.map((entry) => ({
		    params: { slug: entry.slug },
		    props: { entry },
	    }))).toString());
    };
    
    onMount(fetchPokemon())
        
    
    
    return (
        <main>
        <h1>Pokemon Finder</h1>
        <h1> {search} </h1>
        <input
            type="text"
            placeholder="Search for a pokemon"
            onInput={(e) => setSearch(e.target.value)}
        />
        <ul>
            <p> {pokemon().length} </p>
            <For each={pokemon()}>
                <p>{pokemon()}</p>
            </For>
        </ul>
        </main>
    );
    }