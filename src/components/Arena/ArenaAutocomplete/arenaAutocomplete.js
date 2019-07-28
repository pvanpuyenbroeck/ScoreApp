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

    const [arenaInputValue, setArenaInputValue] = useState(props.value);
    const [allArenas, setAllArenas] = useState("");
    const [autoCompleteResults, setAutoCompleteResults] = useState("");
    const [showAutocompleteResults, setShowAutocompleteResult] = useState(true);

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

    const AutocompleteStyle = {
        display: showAutocompleteResults ? 'block' : 'none',
    }

    const arenaSelected = (arena) => {
        props.selectedArena(arena)
        setArenaInputValue(arena.sporthal)
        setShowAutocompleteResult(false)
    }

    const inputValueChanged = (value) => {
        setArenaInputValue(value.target.value)
        setShowAutocompleteResult(true)
    }

    return (
        <div className={classes.AutocompleteContainer}>
            <input
                type="text" onChange={(value) => inputValueChanged(value)}
                placeholder={"Sporthal"}
                value={arenaInputValue}
                className={classes.InputField}
            />
            {autoCompleteResults === "" ? null :
                <div className={classes.AutocompleteResults} style={AutocompleteStyle}>
                    {autoCompleteResults.map(result => {
                        return (
                            <div
                                className={classes.Row}
                                onClick={() => arenaSelected(result)}
                                key={result.code}>
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