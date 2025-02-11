import React from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap';
import WordList from './WordList';
import SearchBox from './SearchBox';

const Dictionary = () => {
  return (
	<>
		<div>
			<SearchBox />
		</div>
		<div>
			<WordList />
		</div>
		
	</>
  )
}

export default Dictionary;