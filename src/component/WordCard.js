import {useState, useRef, useEffect} from 'react'
import {Row, Col, Button} from 'react-bootstrap';
import '../index.css'
import dataStore from '../store/dataStore';

const WordCard = ({word}) => {
	const {removeWord, updateWord, updated, getList} = dataStore();

	const deleteWord= async()=>{
		await removeWord(word.id);
	}
	// 수정모드와 관련해서
	const [editing, setEditing] = useState(false);
	const [newWord, setNewWord] = useState({eng:word?.eng, kor:word?.kor, info: word?.info, image: word?.image, id:word?.id});
	const engRef = useRef(null);
	const korRef = useRef(null);
	const infoRef = useRef(null);
	const imageRef = useRef(null);
	
	// 수정할 필드를 클릭하면, 해당 input에 포커스 이동
	const handleEdit =(field)=>{
		console.log('edit:', field)
		setEditing(true);
		
		setTimeout(()=>{
			if(field === 'eng') {
				engRef.current?.focus();
				// engRef.current.setSelectionRange(0, 0); // 맨 앞에 커서 이동
			}
			if(field === 'kor') {
				korRef.current?.focus();
				// korRef.current.setSelectionRange(0, 0); // 맨 앞에 커서 이동
			}
			if(field === 'info') {
				infoRef.current?.focus();
				// infoRef.current.setSelectionRange(0, 0); // 맨 앞에 커서 이동
			}
			if(field === 'image'){
				imageRef.current?.focus();
			}
		},1)
	}
	const handleUpdate = async()=>{
		if(newWord.eng !== word.eng || newWord.kor !==word.kor || newWord.info !== word.info || newWord.image !== word.image){
			await updateWord(newWord);
			// setNewWord({eng:"", kor:"",info:"", id:"", image:""})//다음번 입력을 위해 초기화
		}
		setEditing(false);
		await getList();
	}
	const handleKeyDown =(e)=>{
		if(e.key === 'Enter') handleUpdate();
	}
	
	useEffect(()=>{
		getList();
	},[updated])

	useEffect(()=>{
		setNewWord({
			eng: word?.eng || "",
			kor: word?.kor || "",
			info: word?.info || "",
			image: word?.image || "",
			id: word?.id || ""
		});
	},[word])
	
	
  return (
	<Row className="wordcard-border1">
		<Col className="wordcard-border2" lg={3} >
			{editing? (
					<input
							ref={imageRef}
							type="text"
							value={newWord.image}
							onChange={(e)=>setNewWord({...newWord, image:e.target.value})}
							onKeyDown={handleKeyDown}
						/>
				):(
					<div onClick={()=>handleEdit("image")}>
						<img src={word?.image || null} alt=""  width="120px"/>
					</div>
				)}
		</Col>
		<Col className="wordcard-border2"  lg={9}>
			<div style={{display: "flex", gap:"3px", justifyContent:"space-between"}}>
				{editing? (
					<div>
						<input
							ref={engRef}
							type="text"
							value={newWord.eng}
							onChange={(e)=>setNewWord({...newWord, eng:e.target.value})}
							onKeyDown={handleKeyDown}
						/>
						<input
							ref={korRef}
							type="text"
							value={newWord.kor}
							onChange={(e)=>setNewWord({...newWord, kor:e.target.value})}
							onKeyDown={handleKeyDown}
						/>
						<textarea
							ref={infoRef}
							value={newWord.info}
							onChange={(e)=>setNewWord({...newWord, info:e.target.value})}
							onKeyDown={handleKeyDown}
							style={{width: "300px", height:"100px", resize:"none"}}
						/>
						
					</div>
				): (
					<div>
						<div onClick={()=>handleEdit("eng")} className="item bold blue">{word?.eng || " "}</div>
						<div onClick={()=>handleEdit("kor")} className="item bold">{word?.kor || " "}</div>
						<div onClick={()=>handleEdit("info")} className="item">{word?.info || " "}</div>
					</div>
				)}
				{/* <span> */}
					{editing?(
						<Button variant="success" onClick={handleUpdate} >확인</Button>
						) :(
						<Button onClick={deleteWord} >삭제</Button>)
					}
				{/* </span> */}
			</div>
			
		</Col>
	</Row>
  )
}

export default WordCard