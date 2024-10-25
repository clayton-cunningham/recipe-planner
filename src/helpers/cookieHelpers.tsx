import { Dispatch, SetStateAction } from "react";
import { BoxEntry, pokemonBox } from "../assets/resources";

export const cookieToBox = (pokemon: BoxEntry, cookieState: number) => {
    if (cookieState >= 4) {  // 100
      cookieState -= 4;
      pokemon.ingredientLevel60 = true;
    }
    if (cookieState >= 2) {  // 010
      cookieState -= 2;
      pokemon.ingredientLevel30 = true;
    }
    if (cookieState >= 1) {  // 001
      cookieState -= 1;
      pokemon.Perf = true;
    }
    return pokemon;
}

export const getCookie = (setSelectedPokemon: Dispatch<SetStateAction<BoxEntry[]>>) => {
    var cookie = document.cookie;

    var cookies = cookie.split(",");

    var cookiePokemon = pokemonBox.map(p => {
      var currCookie = cookies.find(c => c.split("#")[0] == p.DexNumber)?.split("#")[1];
      if (currCookie == undefined) return p;
      return cookieToBox(p, +currCookie);
    })

    setSelectedPokemon(cookiePokemon);
}

export const boxToCookie = (pokemon: BoxEntry) => {
    var cookieState = 0;
    if (pokemon.Perf) cookieState += 1;              // 001
    if (pokemon.ingredientLevel30) cookieState += 2; // 010
    if (pokemon.ingredientLevel60) cookieState += 4; // 100
    return cookieState;
}

export const setCookie = (selectedPokemon: BoxEntry[]) => {
    var cookie = selectedPokemon.map(p => p.DexNumber + "#" + boxToCookie(p)).join(',');

    document.cookie = "pokemon=" + cookie;
}