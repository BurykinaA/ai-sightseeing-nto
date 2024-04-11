import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import { Modal, } from 'flowbite-react';

import axios from 'axios';
import FileCard from './FileCard';
import { modalTheme } from '../theme';
import { URL } from '../const';
import { ObjContext } from '../context';
import SelectDD from './SelectDD';


function TextSearch({objID, disabled, setObjects}) {
  const {obj, setObj}= useContext(ObjContext)
  const [openModal, setOpenModal] = useState(false);
  const [data, setData]=  useState({text:'', city:''})
  const handleFilterChangeNew = (data, type) => {
    var dataa ={[type]: data}
    
    setData(prevState => ({
      ...prevState,
      ...dataa
    }));
  };
  const stat={
    "owner": {
        "values": [
            {
                "id": "vlad",
                "value": "Владимир",
                "coordinates": [56.129042, 40.407215],
            },
            {
                "id": "yar",
                "value": "Ярославль",
                "coordinates": [57.626074, 39.884470]

            },
            {
                "id":  "nn",
                "value": "Нижний Новгород",
                "coordinates": [56.326887, 44.005986]
            },
            {
                "id": "ekb",
                "value": "Екатеринбург",
                "coordinates": [56.838011, 60.597465]
            },
            
        ]
    },
   }

    
    const handleSubmit=(event)=>{
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        setOpenModal(false)
        axios.post(URL+'api/text_reseach', data,'' )
        .then(response=>{
          console.log(response.data)
          setObj(response.data)
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
          <div>
                Город*
                <SelectDD absolute={true} oneAnsw={true} opened={false}  filter={data.city}  handleFilterChangeNew={handleFilterChangeNew} name='Город' type='city' value={stat&&stat.owner.values} />
              </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[16px]'>
          

            <div className='mt-4'>
                <p className="font-normal text-[#0B1F33] mb-2" > Описание</p>
                <input required className=" bg-[#F5F7FA] rounded-lg h-10 w-full outline-0 px-2 py-2.5" placeholder="Описание" value={data.text} onChange={(e)=>setData({...data, text:e.target.value})}/>
            </div>
             <div className='mt-4'>
             <button 
              type='reset' 
              onClick={() => (setOpenModal(false), setData({text:'', city:''}))} 
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
              disabled={data.city==''||data.text==''}
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

