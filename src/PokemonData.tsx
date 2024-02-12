import axios from "axios";
import styles from "./PokemonData.module.scss";
import { useEffect, useState } from "react";
import { useAsync } from "./useAsync";

type PokemonDataProps = {
  name: string;
};

async function getPokemonData(pokemonName: string[]) {
  //   if (pokemonName === "Abra") {
  //     await new Promise((resolve) => setTimeout(resolve, 5000));
  //   }
  //   await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000));

  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName[0].toLowerCase()}`
  );

  return res.data;
}

export function PokemonData({ name }: PokemonDataProps) {
  const {isLoading, data} = useAsync([name], getPokemonData);

  // useEffect(() => {
  //   let isCanceled = false;

  //   setPokemonData(null);
  //   getPokemonData(name).then((pokemonData) => {
  //     if (isCanceled) {
  //       return;
  //     }

  //     setPokemonData(pokemonData);
  //   });

  //   return () => {
  //     isCanceled = true;
  //   };
  // }, [name]);

  if (isLoading) {
    return (
      <article className={styles.pokemonData}>
        <p className={styles.loadingIndicator}>Loading...</p>
      </article>
    );
  }

  return (
    <article className={styles.pokemonData}>
      <article>
        <h2>{name}</h2>
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </article>
      <article className={styles.pokemonStats}>
        <h3>Stats</h3>
        <ul>
          <li>HP: {getStat(data, "hp")}</li>
          <li>Attack: {getStat(data, "attack")}</li>
          <li>Defense: {getStat(data, "defense")}</li>
          <li>Special attack: {getStat(data, "special-attack")}</li>
          <li>Special defense: {getStat(data, "special-defense")}</li>
          <li>Speed: {getStat(data, "speed")}</li>
        </ul>
      </article>
    </article>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getStat(pokemonData: any, statName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return pokemonData.stats.find((stat: any) => stat.stat.name === statName)
    .base_stat;
}
