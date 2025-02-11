import {useEffect, useState} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap';
import WordCard from './WordCard';
import dataStore from '../store/dataStore';

const WordList = () => {
	const {wordList, sortWord, getList} = dataStore();
	const [asc, setAsc] = useState(true);

	useEffect(()=>{
		getList();
	},[])

	const sort=()=>{
		sortWord(asc);
		setAsc(!asc);
	}

  return (
	<div>
		<h2 onClick={sort} className="green">Words</h2>
		<div>
			{wordList?.map((word)=> 
				<li key={word.id}>
					<WordCard word={word} />
				</li>)}
		</div>
	</div>
  )
}

export default WordList