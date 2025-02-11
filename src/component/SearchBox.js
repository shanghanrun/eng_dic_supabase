import React, {useState} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap';
import dataStore from '../store/dataStore';

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");
	const {searchWord} = dataStore();

	const searchByName=(event)=>{
		event.preventDefault();
		searchWord(keyword);
		setKeyword("")
	}

  return (
	<div>
		<Form onSubmit={searchByName}>
			<Row>
				<Col lg={10}>
					<Form.Control type="text" placeholder="단어를 입력해주세요." onChange={(e)=>setKeyword(e.target.value)} value={keyword}/>
				</Col>
				<Col lg={2}>
					<Button type="submit">찾기</Button>
				</Col>
			</Row>
		</Form>
	</div>
  )
}

export default SearchBox