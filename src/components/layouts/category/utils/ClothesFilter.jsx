import { catNextIcon } from '@/utils/Svgs'
import React from 'react';
import { setFilters } from '@/redux/features/filters/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
const ClothesFilter = ({ clothes }) => {
  const { filters } = useSelector((state) => state.filters)
  const [active, setActive] = React.useState(filters.subCategory || clothes[0])
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col w-ful sm:gap-y-5 gap-y-4 sm:mt-6 mt-4 sm:pb-6 pb-4 border-b border-b-black border-opacity-10 ">
      {clothes.map((cloth, index) => (
        <div
          key={index}
          className={`flex flex-row justify-between w-full items-center cursor-pointer ${active === cloth ? 'font-bold p-1 rounded-lg shadow-md' : 'font-normal'}`}
        >
          <button onClick={() => {
            setActive(cloth); dispatch(setFilters(
              // (prevState) => ({ ...prevState, subCategory: cloth }))
              { subCategory: cloth }
            ))
          }}

            className={`opacity-60 w-full text-left`}>{cloth}</button>

          {catNextIcon}
        </div>
      ))}
    </div>
  )
}

export default ClothesFilter
