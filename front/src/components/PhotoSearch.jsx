import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import { Modal, } from 'flowbite-react';

import axios from 'axios';
import FileCard from './FileCard';
import { modalTheme } from '../theme';
import SelectDD from './SelectDD';
import { URL } from '../const';
import { ObjContext } from '../context';


function PhotoSearch({objID, disabled}) {
  const {obj, setObj}= useContext(ObjContext)
  
  const [openModal, setOpenModal] = useState(false);
  const [data, setData]=  useState({
    comment:'',
    pic:'',
    city:'',
    type: ''
  })
  // const [data, setData] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files; // Получаем выбранные файлы
    // const fileList = []; // Создаем пустой массив для хранения информации о файлах
    const formData = new FormData();

    Array.from(files).forEach((file, index) => {
      formData.append(`file`, file); // Добавляем файл в объект FormData
    });
    // Преобразуем объект FileList в массив и записываем его в состояние
    const fileList = Array.from(files).map((file, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // получаем строку base64 без префикса 'data:image/jpeg;base64,'
        // Здесь вы можете использовать base64String, например, отправить его на сервер или сохранить в состоянии вашего приложения
        fileItem.file = base64String; // Записываем строку base64 в поле file
      };
      const fileItem = {
        id: pictures.length + index + 1,
        name: file.name,
        type: file.name.substring(file.name.lastIndexOf('.') + 1),
        weight: (file.size / 1024 / 1024).toFixed(2), // Преобразуем размер в мегабайты и округляем до двух знаков после запятой
        file: undefined // Изначально устанавливаем file как undefined, затем заменим его на base64String
      };
      return fileItem;
    });
    
    
    setData({...data, pic:formData})
    setPictures(prevData => [...prevData, ...fileList]);
  };

  const [pictures, setPictures]=  useState([])
    const deletePicture=(id)=>{
        setPictures(prevPic => prevPic.filter(item => item.id != id))
    }
    useEffect(()=>{console.log(pictures)},[pictures])
    
    const handleSubmit=(event)=>{
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        setOpenModal(false)
        
        const path=data.type[0].id=='search'?'api/picture_reseach':'api/picture_category'
        axios.post(URL+path, {text:data.comment, pictures:pictures, city: data.city[0]},'' )
        .then(response=>{
        console.log(response.data)
        setObj(response.data)
        // setContact([...contact, data])
        })
        .catch(function (error) {
        console.log(error);
        });
    }
  useEffect(()=>{console.log(data)},[data])

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
   useEffect(()=>{
    setData({
      comment:'',
      pic:'',
      city:'',
      type: ''
    }), setPictures([])
   },[openModal])

  return (
    <>
      <button disabled={disabled} onClick={() => setOpenModal(true)} className='min-w-max blueButton'>
        <p className='mb-0 '>Поиск по фото</p>
      </button>
      <Modal className='z-20  mx-auto my-auto absolute' theme={modalTheme} position="center" size='custom' dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='pb-0 m-0'>
          Поиск по фото
          
        </Modal.Header>
        <Modal.Body className=''>
        <div className="w-[564px] h-px justify-center items-center inline-flex">
              <div className="w-[564px] h-px bg-indigo-300 rounded-[1px]" />
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[16px]'>
            <div className='flex items-center gap-2'>
              <div>
                Тип запроса*
                <SelectDD absolute={true} oneAnsw={true} opened={false}  filter={data.city}  handleFilterChangeNew={handleFilterChangeNew} name='Город' type='type' value={[{id:'category', value: 'Определить категории по зображению'}, {id:'search', value: 'Найти похожие изображения'}]} />
              </div>
              <div>
                Город*
                <SelectDD absolute={true} oneAnsw={true} opened={false}  filter={data.city}  handleFilterChangeNew={handleFilterChangeNew} name='Город' type='city' value={stat&&stat.owner.values} />
              </div>
            </div>
            

            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-max border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                    <div class="flex flex-col items-center justify-center py-12">
                        <p class="text-gray-500 text-sm font-normal  leading-tight">Перетащите файлы или выберите на компьютере</p>
                        <p class="text-center text-blue-600 text-base font-normal  leading-normal flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15.0002 6.99996L8.50019 13.5C8.10237 13.8978 7.87887 14.4374 7.87887 15C7.87887 15.5626 8.10237 16.1021 8.50019 16.5C8.89802 16.8978 9.43758 17.1213 10.0002 17.1213C10.5628 17.1213 11.1024 16.8978 11.5002 16.5L18.0002 9.99996C18.7958 9.20432 19.2428 8.12518 19.2428 6.99996C19.2428 5.87475 18.7958 4.79561 18.0002 3.99996C17.2045 3.20432 16.1254 2.75732 15.0002 2.75732C13.875 2.75732 12.7958 3.20432 12.0002 3.99996L5.50019 10.5C4.30672 11.6934 3.63623 13.3121 3.63623 15C3.63623 16.6878 4.30672 18.3065 5.50019 19.5C6.69367 20.6934 8.31236 21.3639 10.0002 21.3639C11.688 21.3639 13.3067 20.6934 14.5002 19.5L21.0002 13" stroke="#1D5DEB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Выбрать файл*
                        </p>
                    </div>
                    <input required accept="image/*" id="dropzone-file" type="file" class="hidden" multiple onChange={handleFileChange}/>
                </label>
            </div> 
           
            <div className='flex items-center gap-6 overflow-auto'>
                {pictures.map((item, index)=>
                    <FileCard key={index} type={item.type} name={item.name} weight={item.weight} id={item.id} deletePicture={deletePicture}/>
                )}
            </div>
            <div className=''>
                <p className="font-normal text-[#0B1F33] mb-2" > Описание</p>
                <input  className=" bg-[#F5F7FA] rounded-lg h-10 w-full outline-0 px-2 py-2.5" placeholder="Описание" value={data.comment} onChange={(e)=>setData({...data, comment:e.target.value})}/>
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
              disabled={data.type==''||data.city==''||pictures.length==0}
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

export default PhotoSearch;

