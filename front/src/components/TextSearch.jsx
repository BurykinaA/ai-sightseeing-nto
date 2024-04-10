import React, { useEffect } from 'react';
import { useState } from 'react';

import { Modal, } from 'flowbite-react';

import axios from 'axios';
import FileCard from './FileCard';
import { modalTheme } from '../theme';


function TextSearch({objID, disabled}) {
  
  const [openModal, setOpenModal] = useState(false);
  const [data, setData]=  useState({text:''})


    
    const handleSubmit=(event)=>{
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        setOpenModal(false)
        axios.post('api/?', data,'' )
        .then(response=>{
        console.log(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });
    }
  useEffect(()=>{console.log(data)},[data])
  return (
    <>
      <button disabled={disabled} onClick={() => setOpenModal(true)} className='min-w-max blueButton'>
        <p className='mb-0 '>Поиск по описанию</p>
      </button>
      <Modal className='z-20  mx-auto my-auto absolute' theme={modalTheme} position="center" size='custom' dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='pb-0 m-0'>
          Поиск по описанию
          
        </Modal.Header>
        <Modal.Body className=''>
        <div className="w-[564px] h-px justify-center items-center inline-flex">
              <div className="w-[564px] h-px bg-indigo-300 rounded-[1px]" />
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[16px]'>
          

            <div className=''>
                <p className="font-normal text-[#0B1F33] mb-2" > Описание</p>
                <input required className=" bg-[#F5F7FA] rounded-lg h-10 w-full outline-0 px-2 py-2.5" placeholder="Описание" value={data.text} onChange={(e)=>setData({...data, text:e.target.value})}/>
            </div>
             <div>
             <button 
              type='reset' 
              onClick={() => (setOpenModal(false), setData({
                subject_id:parseInt(objID, 10),
                last_name:'',
                first_name:'',
                middle_name:'',
                phone_number:'',
                email:'',
                contact_type:'',
                comment:'',
              }))} 
              className='mr-[16px] blueButtonInherit'
              placeholder='pup'
            >
              Отменить
            </button>
            <button 
              type='submit' 
              // onClick={() => setOpenModal(false)} 
              className='blueButton'
              placeholder='pup'
            >
              Поиск
            </button>
             </div>
            
          </form>
          
        </Modal.Body>
        
      </Modal>
    </>
    
  );
}

export default TextSearch;

