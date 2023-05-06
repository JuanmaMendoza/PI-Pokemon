import {
    ORDER_POKEMONS,
    FILTER_POKEMONS,
    FETCH_POKEMONS,
    CREATE_POKEMON,
    SET_CURRENT_PAGE,
    FETCH_TYPES,
    SEARCH_POKEMONS
} from "./actions";

const initialState = {
    allPokemons: [],
    types: [],
    detail: [],
    orderedPokemons: [],
    pokemons: [],
    currentPage: 1,
    totalPages: 0,
    refresh: false, 
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ORDER_POKEMONS:
            let orderedPokemons = [];
            //ordeno por nombres
            if (payload.name === 'asc') {
                orderedPokemons = state.pokemons.sort((a, b) => a.name.localeCompare(b.name));

            };
            if (payload.name === 'desc') {
                orderedPokemons = state.pokemons.sort((a, b) => b.name.localeCompare(a.name));
            };
            //ordeno por ataques
            if (payload.attack === 'asc') {
                orderedPokemons = state.pokemons.sort((a, b) => a.attack - b.attack);
            };
            if (payload.attack === 'desc') {
                orderedPokemons = state.pokemons.sort((a, b) => b.attack - a.attack);
            };
            return { ...state, orderedPokemons: orderedPokemons }

        case FILTER_POKEMONS:
        //filtro por source    
        let combinedPokemons = [];
        const dbPokemons = state.orderedPokemons.filter(
          (pokemon) => !Number(pokemon.id)
        );
        const apiPokemons = state.orderedPokemons.filter((pokemon) =>
          Number(pokemon.id)
        );
        if (payload.bySource.db)
          combinedPokemons = [...combinedPokemons, ...dbPokemons];
        if (payload.bySource.api)
          combinedPokemons = [...combinedPokemons, ...apiPokemons];
  
        // filtro por tipo
        let filteredPokemonsByType = combinedPokemons.filter((pokemon) => {
          return payload.byType.every((checkedType) => {
            return pokemon.types.some((type) => {
              return type === checkedType;
            });
          });
        });
        if (!payload.byType.length) {
          filteredPokemonsByType = combinedPokemons;
        }
  
        return {
          ...state,
          pokemons: [...filteredPokemonsByType],
          currentPage: 1,
          totalPages: Math.ceil(filteredPokemonsByType.length / 12),
        };
        case FETCH_TYPES:
            return {
                ...state,
                types: payload
            };

        case FETCH_POKEMONS:
            return {
                ...state,
                allPokemons: payload,
                orderedPokemons: payload,
                pokemons: payload,
                totalPages: Math.ceil(payload.lenght / 12),
                refresh: false
            }

        case CREATE_POKEMON:
            return {
                ...state,
                refresh: true,
              };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload
            }

        case SEARCH_POKEMONS:
            let resultPokemons = [];
            const search = payload.toLowerCase();
            if (search === '') {
                resultPokemons = state.orderedPokemons;
            }
            else {
                resultPokemons = state.orderedPokemons.filter((pokemon) => 
                    pokemon.name === search
                )
            }
            return {
                ...state,
                pokemons: resultPokemons,
                currentPage: 1,
                totalPages: Math.ceil(resultPokemons.length / 12)
            }

        default:
            return { ...state };
    };
};

export default reducer;


