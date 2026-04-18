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
          <p className="text-sm font-extrabold text-primary m-0 leading-none">User Profile</p>
          <p className="text-[10px] text-[#22C55E] mt-1 m-0 font-extrabold uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-lg inline-block">Verified</p>
        </div>
        <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-white font-extrabold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
          <FiUser size={20} />
        </div>
        <FiChevronDown size={14} className={`text-muted transition-all ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-56 bg-white p-4 z-50 shadow-2xl rounded-2xl border border-gray-100">
          <div className="p-3 hover:bg-light rounded-xl cursor-pointer transition-colors group">
             <p className="text-sm font-extrabold flex items-center gap-2 m-0 text-primary">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Online
            </p>
          </div>
          <div className="p-3 hover:bg-light rounded-xl cursor-pointer transition-colors mt-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B7280] mb-1">Account Role</p>
            <p className="text-sm font-extrabold m-0 text-primary">Career Seeker</p>
          </div>
        </div>
      )}
    </div>
  )
}
