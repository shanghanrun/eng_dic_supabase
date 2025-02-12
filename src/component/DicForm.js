import React from 'react'
import {Form, Button} from 'react-bootstrap';
import {useState} from 'react';
import dataStore from '../store/dataStore';

const DicForm = () => {
	const {register} = dataStore();

	const [eng, setEng] = useState("");
	const [kor, setKor] = useState("");
	const [info, setInfo] = useState("");
	const [image, setImage] = useState("");
	const [batch, setBatch] = useState("");
	const [excel, setExcel] = useState("");

	const addWord= async(event)=>{
		event.preventDefault();

		const data ={eng, kor, info, image};
		await register(data); 
		
		// 입력란 비우기
		setEng("");
		setKor("");
		setInfo("");
		setImage("");
	}
	const addBatch= async(event)=>{
		event.preventDefault();
		console.log("batch 프르세스")

		// Step 1: 개행을 먼저 기준으로 분리
  		const lines = batch.split(/\r?\n|\r|\n/).map(line => line.trim()).filter(line => line !== "");
		console.log("Lines:", lines);

		// Step 2: 개수가 3의 배수가 아니라면 오류 출력
		if (lines.length % 3 !== 0) {
			console.log("오류: 항목 개수가 3의 배수가 아닙니다.");
			return;
		}

		// Step 3: 3개 단위로 그룹화
		const entries = [];
		for (let i = 0; i < lines.length; i += 3) {
			entries.push([lines[i], lines[i + 1], lines[i + 2]]);
		}

		console.log("Entries:", entries);

		// Step 4: 단어 등록
		for (const [eng, kor, info] of entries) {
			await register({ eng, kor, info });
		}

		// 입력 필드 초기화
		setBatch("");
	}

	const addExcel=async(event)=>{
		event.preventDefault()
		const entries = excel.split(/\r?\n/) // 줄바꿈 단위로 나누기
                     .map(line => line.split('\t').map(cell => cell.trim())) // 각 줄을 탭으로 분리
                     .filter(entry => entry.length === 3); // 유효성 검사 (3개 요소인지 확인)

		console.log(entries);

		// 단어 등록
		for (const [eng, kor, info] of entries) {
			await register({ eng, kor, info });
		}

		// 입력 필드 초기화
		setExcel("");
	}

  return (
	<div>
		<Form onSubmit={addWord}>
			<Form.Group className="mb-3" controlId="formName">
				<Form.Label>Word</Form.Label>
				<Form.Control type="text" placeholder="English Word를 입력해주세요" onChange={(e)=> setEng(e.target.value)} value={eng} />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formContact">
				<Form.Label>의미</Form.Label>
				<Form.Control type="text" placeholder="한글 뜻을 입력해주세요" onChange={(e)=>setKor(e.target.value)} value={kor}/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formContact">
				<Form.Label>기타</Form.Label>
				<Form.Control type="text" placeholder="기타정보를 입력해주세요" onChange={(e)=>setInfo(e.target.value)} value={info}/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formContact">
				<Form.Label>이미지</Form.Label>
				<Form.Control type="text" placeholder="이미지주소를 입력해주세요" onChange={(e)=>setImage(e.target.value)} value={image}/>
			</Form.Group>
			<Button variant="primary" type="submit">
				추가
			</Button>
			
		</Form>
		<div style={{marginTop: "20px", borderTop:"1px solid black"}}></div>
		<Form onSubmit={addBatch}>
			<Form.Group className="mb-3" controlId="formContact">
				<Form.Label style={{color:"green", fontSize:"20px"}}>일괄 입력</Form.Label>
				<Form.Control as="textarea" placeholder="car(엔터) 차(엔터) I drove car.나는 차를 몰았다. [형식]" onChange={(e)=>setBatch(e.target.value)} value={batch}
					/>
			</Form.Group>
			<Button variant="success" type="submit">
				일괄 추가
			</Button>
		</Form>
		<div style={{marginTop: "20px", borderTop:"1px solid black"}}></div>
		<Form onSubmit={addExcel}>
			<Form.Group className="mb-3" controlId="formContact">
				<Form.Label style={{color:"orange", fontSize:"20px"}}>엑셀 입력</Form.Label>
				<Form.Control as="textarea" placeholder="car | 차 | I drove car.  형식으로 입력" onChange={(e)=>setExcel(e.target.value)} value={excel}/>
			</Form.Group>
			<Button variant="warning" type="submit">
				엑셀 추가
			</Button>
		</Form>
	</div>
  )
}

export default DicForm