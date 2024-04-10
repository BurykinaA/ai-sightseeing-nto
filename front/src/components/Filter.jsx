import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import SelectDD from './SelectDD'

function Filter({filter, handleFilterChangeNew, setFilter, getData}) {
  const [count, setCount] = useState(0)
  const [open, setOpen]=useState(false)
  const stats={
    "owner": {
        "values": [
            {
                "id": 1,
                "value": "Волгоград"
            },
            {
                "id": 2,
                "value": "Ярославль"
            },
            {
                "id": 3,
                "value": "Нижний Новгород"
            },
            {
                "id": 4,
                "value": "Екатеринбург"
            },
            
        ]
    },
    "status": {
        "values": [
            {
                "id": 1,
                "value": "Действующий"
            },
            {
                "id": 2,
                "value": "Проект"
            },
            {
                "id": 3,
                "value": "В работе"
            },
            {
                "id": 4,
                "value": "Реализован"
            }
        ]
    },}
  
  return (
    
    <div className='rounded-xl bg-white shadow-md flex flex-col gap-4 p-4' >
    <p className='text-2xl font-semibold flex items-center'>
      {open? 
        <svg onClick={()=>setOpen(!open)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17.7046 13.2805C18.0985 13.6739 18.0985 14.3116 17.7046 14.705C17.3108 15.0983 16.6723 15.0983 16.2785 14.705L11.2869 9.71945C10.8931 9.3261 10.8931 8.68836 11.2869 8.29501C11.6807 7.90166 12.3193 7.90166 12.7131 8.29501L17.7046 13.2805Z" fill="#1D5DEB"/>
          <path d="M7.72152 14.7048C7.3277 15.0982 6.68919 15.0982 6.29537 14.7048C5.90154 14.3115 5.90154 13.6737 6.29537 13.2804L11.2869 8.29501C11.6807 7.90166 12.3193 7.90166 12.7131 8.29501C13.1069 8.68836 13.1069 9.32595 12.7131 9.7193L7.72152 14.7048Z" fill="#1D5DEB"/>
        </svg>
      :
        <svg onClick={()=>setOpen(!open)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="#1D5DEB"/>
          <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="#1D5DEB"/>
        </svg> } 
        Фильтры
      </p>
    {open&&<div>
      <div className='flex flex-col gap-2'>
        Город
      <SelectDD opened={false}  filter={filter.owner}  handleFilterChangeNew={handleFilterChangeNew} name='Город' type='owner' value={stats&&stats.owner.values} />
  
      Тип достопримечательности
      <SelectDD opened={false} filter={filter.type} handleFilterChangeNew={handleFilterChangeNew} name='Тип достопримечательности' type='type'   value={stats&&stats.status.values} />
      
      Важность достопримечательности
      <SelectDD opened={false} filter={filter.status} handleFilterChangeNew={handleFilterChangeNew} name='Важность достопримечательности' type='status' value={[{id: 1, value: '1'},{id: 2, value: '2'},{id: 3, value: '3'}]}/>
    
      </div>
      <div className='flex gap-2 mt-4'>
        <button className='blueButtonInherit w-full' 
          onClick={()=>{setFilter({
            owner: [], // Категория правообладателя
            type: [], //Тип собственности
            status: [], // Статус
            
          })}}>Отменить</button>
        <button className='blueButton w-full' onClick={getData}>Применить</button>
      </div>
    </div>}
  </div>
  )
}

export default Filter
