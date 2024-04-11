import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';


function SelectDD({absolute, value, name, handleFilterChangeNew, type,filter, opened, oneAnsw}) {
  const item =[]
  const [selected, setSelected]= useState([])
  useEffect(()=>{
    
    if(filter&&filter.length!=selected.length)
    setSelected([])
  },[ filter])
  const removeFromAllObj = (id) => {
    var updatedAllObj;
    
     updatedAllObj = selected.filter(obj => obj.id !== id);
    setSelected(updatedAllObj);
  };


  useEffect(()=>{
    handleFilterChangeNew(selected, type)
    
  },[selected])
  const [open, setOpen]= useState(false)

  useEffect(()=>{
    setOpen(opened)
  },[opened])


  
  const buttonRef = useRef(null);



  return (
    <div ref={buttonRef} className={open?' rounded-t-lg bg-white  max-w-[368px] relative':" rounded-lg bg-white border-2 max-w-[368px] relative"}>
    
      <div onClick={()=>value.filter(item => selected.some(selectedItem => selectedItem.id == item.id)).length==0&&setOpen(!open)} className={(open&&value.filter(item => !selected.some(selectedItem => selectedItem.id == item.id)).length>0)?' flex items-center w-full border-2 border-b-0 border-indigo-300 rounded-t-lg':"flex items-center w-full"}>
        <div className=" min-h-10  px-2 py-2  justify-start items-center gap-1 inline-flex ">
          {(selected.length==0)&&<div className="user-select-none min-w-max grow shrink basis-0 text-slate-400 text-sm font-normal  leading-tight">{name}</div>}
          <div className=' '>
           
            {
            selected.length>0&&selected.map((item)=>
              
              <div key={item.id} className="w-max max-w-[200px] mr-1 my-1 px-2 py-1 bg-indigo-100 rounded-lg justify-between items-center inline-flex">
                <div className="text-slate-900 text-sm font-normal  leading-tight truncate">{item.value}</div>
                <svg onClick={()=>(removeFromAllObj(item.id))} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.16499 14.9524C3.92091 15.1965 3.92091 15.5922 4.16499 15.8363C4.40907 16.0803 4.8048 16.0803 5.04887 15.8363L10 10.8851L14.9511 15.8363C15.1952 16.0803 15.5909 16.0803 15.835 15.8363C16.0791 15.5922 16.0791 15.1965 15.835 14.9524L10.8839 10.0012L15.8345 5.05056C16.0786 4.80648 16.0786 4.41075 15.8345 4.16667C15.5905 3.92259 15.1947 3.92259 14.9507 4.16667L10 9.11734L5.04935 4.16667C4.80527 3.92259 4.40954 3.92259 4.16547 4.16667C3.92139 4.41075 3.92139 4.80648 4.16547 5.05056L9.11612 10.0012L4.16499 14.9524Z" fill="#9DACCE"/>
                </svg>
              </div>
            )
          
          
          }
          </div>
          
         
          <div className=' w-max'>
          {value.filter(item => !selected.some(selectedItem => selectedItem.id == item.id)).length>0?
            (open? 
              <svg onClick={()=>setOpen(!open)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17.7046 13.2805C18.0985 13.6739 18.0985 14.3116 17.7046 14.705C17.3108 15.0983 16.6723 15.0983 16.2785 14.705L11.2869 9.71945C10.8931 9.3261 10.8931 8.68836 11.2869 8.29501C11.6807 7.90166 12.3193 7.90166 12.7131 8.29501L17.7046 13.2805Z" fill="#1D5DEB"/>
                <path d="M7.72152 14.7048C7.3277 15.0982 6.68919 15.0982 6.29537 14.7048C5.90154 14.3115 5.90154 13.6737 6.29537 13.2804L11.2869 8.29501C11.6807 7.90166 12.3193 7.90166 12.7131 8.29501C13.1069 8.68836 13.1069 9.32595 12.7131 9.7193L7.72152 14.7048Z" fill="#1D5DEB"/>
              </svg>
            :
              <svg onClick={()=>setOpen(!open)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="#1D5DEB"/>
                <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="#1D5DEB"/>
              </svg>  )
          :
            <svg onClick={()=>(setSelected([]))} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.16499 14.9524C3.92091 15.1965 3.92091 15.5922 4.16499 15.8363C4.40907 16.0803 4.8048 16.0803 5.04887 15.8363L10 10.8851L14.9511 15.8363C15.1952 16.0803 15.5909 16.0803 15.835 15.8363C16.0791 15.5922 16.0791 15.1965 15.835 14.9524L10.8839 10.0012L15.8345 5.05056C16.0786 4.80648 16.0786 4.41075 15.8345 4.16667C15.5905 3.92259 15.1947 3.92259 14.9507 4.16667L10 9.11734L5.04935 4.16667C4.80527 3.92259 4.40954 3.92259 4.16547 4.16667C3.92139 4.41075 3.92139 4.80648 4.16547 5.05056L9.11612 10.0012L4.16499 14.9524Z" fill="#1D5DEB"/>
            </svg>
          }
          </div>
          
        </div>
      </div>
      {(open&&value.filter(item => !selected.some(selectedItem => selectedItem.id == item.id)).length>0)&&
        <div className={(absolute==true)?'absolute w-full z-10 border-2  border-indigo-300 rounded-b-lg':' w-full z-10 border-2  border-indigo-300 rounded-b-lg'} onClick={()=>absolute&&setOpen(!open)}>
          <div className=" h-[1px] self-auto px-[16px] bg-white"/>
          <div className="bg-white text-sm  border-0 text-left max-h-[180px] overflow-auto rounded-b-lg">
         
          {(value.filter(item => !selected.some(selectedItem => selectedItem.id == item.id)))&& 
          value.filter(item => !selected.some(selectedItem => selectedItem.id == item.id)).map(item=>
             
             <div onClick={(e)=>{ !selected.some(obj => obj.id === item.id)&&(oneAnsw?setSelected( [{id:item.id, value:item.value, coordinates:item.coordinates}]):setSelected([...selected, {id:item.id, value:item.value, coordinates:item.coordinates}]))}} key={item.id} value={item.value} className="border-b px-2 min-h-11  py-3 justify-start items-center gap-1 inline-flex hover:bg-slate-100">
              <div className="  border-slate-200 text-slate-900 text-sm font-normal   leading-tight">{item.value}</div>
            </div>
                )}

            

            
            
          </div> 
        </div>
      }
    </div>
  );
}

export default SelectDD;

