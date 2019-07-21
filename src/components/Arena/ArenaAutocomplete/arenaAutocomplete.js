import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase-scoreapp';
import classes from './arenaAutocomplete.css';

const checkArenasOnCode = (input, arenas) => {
    // const arenaCodes = Object.keys(arenas);
    if (arenas !== "") {
        const filteredArenaCodes = arenas.filter(arena => {
            return arena.code.startsWith(input.toUpperCase());
        })
        return filteredArenaCodes;
    }
    return [];
}

const checkAreaOnGemeente = (input, arenas) => {
    if (arenas !== "") {
        let filteredArenaCodes = arenas.filter(arena => {
            return arena.locatie.gemeente.toUpperCase().startsWith(input.toUpperCase());
        });
        return filteredArenaCodes;
    }
    return [];
}

const arenaAutocomplete = (props) => {

    const [arenaInputValue, setArenaInputValue] = useState("");
    const [allArenas, setAllArenas] = useState("");
    const [autoCompleteResults, setAutoCompleteResults] = useState("");

    useEffect(() => {
        let allArenas = [];
        firebase.database().ref("/Arenas").once("value").then(arenas => {
            const arenaArray = Object.values(arenas.val());
            arenaArray.map(arena => {
                const code = Object.keys(arena)[0];
                arena[code].code = code;
                allArenas.push({
                    ...arena[code],
                });
            })
            setAllArenas(allArenas);
        })
        return;
    });

    useEffect(() => {
        let filteredArenaCodes = checkArenasOnCode(arenaInputValue, allArenas);
        let filteredArenaGemeente = checkAreaOnGemeente(arenaInputValue, allArenas);
        let filteredArenas = filteredArenaCodes.concat(filteredArenaGemeente);
        const distinctFilteredArenas = [...new Set(filteredArenas.map(arena => arena))];
        setAutoCompleteResults(distinctFilteredArenas.length <= 10 ? distinctFilteredArenas : "");
    }, [arenaInputValue]);

    return (
        <div>
            <input type="text" onChange={(value) => setArenaInputValue(value.target.value)} />
            {autoCompleteResults === "" ? null :
                <div className={classes.AutocompleteContainer}>
                    {autoCompleteResults.map(result => {
                        return (
                            <div className={classes.Row} onClick={() => props.selectedArena(result)}>
                                <div>{result.code}</div>
                                <div>{result.sporthal}</div>
                                <div>{result.locatie.gemeente}</div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default arenaAutocomplete;