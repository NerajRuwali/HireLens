import { FiUser, FiChevronDown } from 'react-icons/fi'
import { useState } from 'react'

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-4 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="hidden md:block text-right">
          <p className="text-sm font-black m-0 leading-none">User Profile</p>
          <p className="text-[10px] text-slate-400 mt-1 m-0 font-black uppercase tracking-widest">Verified</p>
        </div>
        <div className="w-11 h-11 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">
          <FiUser size={20} />
        </div>
        <FiChevronDown size={14} className={`text-slate-400 transition-all ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-56 bg-white p-4 z-50 shadow-2xl rounded-2xl border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          <div className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group dark:hover:bg-slate-700">
             <p className="text-sm font-bold flex items-center gap-2 m-0 dark:text-white">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Online
            </p>
          </div>
          <div className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors mt-2 dark:hover:bg-slate-700">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Role</p>
            <p className="text-sm font-bold m-0 dark:text-white">Career Seeker</p>
          </div>
        </div>
      )}
    </div>
  )
}
