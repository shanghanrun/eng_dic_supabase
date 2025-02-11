import React, {useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import DicForm from '../component/DicForm';
import Dictionary from '../component/Dictionary';
import '../index.css'
import SearchBox from '../component/SearchBox';


const Main = () => {
	

	// useEffect(()=>{
	// 	getWordList();
	// },[updated])

  return (
	<div>
		<h1 style={{textAlign: "center", margin: "40px 0"}}>영어사전</h1>
		<Container className="wordcard-border1" style={{padding:"30px"}}>
			<Row style={{gap: "20px"}}>
				<Col>
					<DicForm />
				</Col>
				<Col>
					<Dictionary />
					{/* <SearchBox /> */}
				</Col>
			</Row>
		</Container>
		
	</div>
  )
}

export default Main