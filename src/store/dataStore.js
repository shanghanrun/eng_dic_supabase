import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kbbrqhbywhurpilyiubc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiYnJxaGJ5d2h1cnBpbHlpdWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzc3NTEsImV4cCI6MjA1NDc1Mzc1MX0.sIREp_NSTvF7mlrMyOlhATEFdTje9nm2EgzlxKgRAwY"

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dataStore = create((set, get)=>({
	wordList:[],
	totalWordCount:0,
	updated: false,
	error: false,
	selectedWord:"",


	//먼저 프론트용으로만 작성
	register: async (word)=>{
			const {data, error} = await supabase.from('words').insert([word]) 

			if (error) { console.log(error); return;}
			console.log('새 데이터 성공: ', data)

			await get().getList();		
	},
	searchWord: async (keyword) => {
		keyword = keyword.trim();

		if (keyword === "") {
			get().getList();  // 키워드가 비어 있으면 전체 목록을 다시 가져옵니다.
			return;
		}		

		const {data, error} = await supabase.from('words').select('*')
			.or(`eng.ilike.%${keyword}%, kor.ilike.%${keyword}%`);
			
		if (error) { console.log(error); return;}

		console.log('검색 결과:', data)
		set({
			wordList: data,
		});
	},
	getList: async()=>{
		const {data, error} = await supabase.from('words').select('*');

		if (error) { console.log(error); return;}
		console.log('리스트 :', data)
		set({
				wordList: data,
		})
	},	
	setWordList: (newList)=> set({wordList: newList}),
	removeWord: async(id)=>{
		console.log('store로 받은 id :', id)
		const {data, error} = await supabase.from('words').delete().eq('id', id)
		if (error) { console.log(error); return;}

		await get().getList();
		
	},
	updateWord: async(newWord)=>{
		console.log('store로 받은 word :', newWord)
		
		const {data, error} = await supabase.from('words').update({
				eng:newWord.eng,
				kor:newWord.kor,
				info:newWord.info
			})
			.eq('id', newWord.id)
		if (error) { console.log(error); return;}
		
		await get().getList()			
		
	},
	sortWord: (asc)=>{
		const list = [...get().wordList]; // 기존리스트를 건드리지 않기 위해
		const sortedList = list.sort((a,b)=>{
			return asc ? a.eng.localeCompare(b.eng) : b.eng.localeCompare(a.eng);
		})
		set({
			wordList: sortedList
		})
	}

}))

export default dataStore;