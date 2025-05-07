import React from 'react'
import CARD from '../../assets/images/chart.jpg'
import { LuTrendingUpDown } from 'react-icons/lu'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Plant Monitoring System</h2>
            {children}
        </div>

        <div className='hidden md:block w-[40vw] h-screen bg-lime-50 bg-auth-bg-img
        bg-no-repeat bg-center overflow-hidden p-8 relative'>
            <div className='w-48 h-48 rounded-[40px] bg-green-600 absolute -top-7 -left-5' />
            <div className='w-48 h-56 rounded-[40px] border-[20px]
             border-emerald-600 absolute top-[30%] -right-10' />
            <div className='w-48 h-48 rounded-[40px] bg-lime-500 absolute -bottom-7 -left-5' />

            <div className='grid grid-cols-1 z-20'>
                <StatsInforCard 
                    icon={<LuTrendingUpDown/>}
                    label="Track the Health of Your Garden/Farm"
                    value="100% growth"
                    color="bg-primary"
                    />
            </div>


            <img src={CARD} className='w-64 lg:w-[90%] rounded-[40%] 
            absolute bottom-10 shadow-orange-400/15' />
        </div>
    </div>
    
  )
}

export default AuthLayout


const StatsInforCard = ({icon, label, value, color}) => {
    return (
    <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-green-400/10
     border border-gray-200/50 z-10'>
        <div className={`w-12 h-12 flex items-center justify-center text-[26px]
        text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
            <span className='text-[20px]'>{value}</span>
        </div>
    </div>
    )
}