import React from 'react'
import useAxiosGet from '../../Hooks/HttpRequests'
import Loader from '../../components/Loader/Loader'
import './styles.css'
import CharacterItem from '../CharacterItem'

export default function CharacterLayout ({ characterName, accountName }) {
  const url = `https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=${accountName}&character=${characterName}`

  const characterInfo = useAxiosGet(url)

  let content = null

  if (characterInfo.error) {
    content = <p>There was an error... please refresh or try again</p>
  }

  if (characterInfo.loading) {
    content = <Loader />
  }

  if (characterInfo.data) {
    const { character, items } = characterInfo.data
    content = (
      <div className='layout-wrapper'>
        <div className='content-wrapper'>
          <h2>Character Name: {character.name}</h2>
          <p>League: {character.league}</p>
          <p>Class: {character.class}</p>
          <p>Level: {character.level}</p>
        </div>
        <div className='grid-container'>
          <CharacterItem items={items} itemName='Flask' gridClass='FLASKS' />
          <CharacterItem items={items} itemName='Belt' gridClass='BELT' />
          <CharacterItem items={items} itemName='Gloves' gridClass='GLOVES' />
          <CharacterItem items={items} itemName='Boots' gridClass='BOOTS' />
          <CharacterItem items={items} itemName='Ring' gridClass='LEFT-RING' />
          <CharacterItem items={items} itemName='Ring2' gridClass='RIGHT-RING'/>
          <CharacterItem items={items} itemName='Amulet' gridClass='NECKLACE' />
          <CharacterItem items={items} itemName='BodyArmour' gridClass='ARMOR'/>
          <CharacterItem items={items} itemName='Offhand' gridClass='LEFT-HAND'/>
          <CharacterItem items={items} itemName='Weapon' gridClass='RIGHT-HAND'/>
          <CharacterItem items={items} itemName='Helm' gridClass='HELMET' />
        </div>
      </div>
    )
  }
  return <div>{content}</div>
}
