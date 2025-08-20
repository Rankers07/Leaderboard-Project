// import React from 'react';

// export default function UserSelector({ users = [], selected, onChange }) {
//   return (
//     <div className="panel-card user-selector">
//       <h3 style={{margin:0}}>Select User</h3>
//       <div className="user-list" style={{marginTop:10}}>
//         {users.map(u => (
//           <div key={u._id}
//             className={`user-item ${selected === u._id ? 'selected' : ''}`}
//             onClick={() => onChange(u._id)}>
//             <img src={u.avatar} alt={u.name} />
//             <div className="meta">
//               <div className="name">{u.name}</div>
//               <div className="points">{u.totalPoints || 0} pts</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function UserSelector({ users = [], selected, onChange }) {
  const [open, setOpen] = useState(false);

  const selectedUser = users.find((u) => u._id === selected);

  return (
    <div className="relative w-64">
      <h3 className="mb-2 font-semibold">Select User</h3>

      {/* Selected User Box */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-3 py-2 bg-white border rounded-lg shadow cursor-pointer"
      >
        {selectedUser ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium">{selectedUser.name}</div>
              <div className="text-sm text-gray-500">
                {selectedUser.totalPoints || 0} pts
              </div>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">-- Choose a user --</span>
        )}
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>

      {/* Dropdown List */}
      {open && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => {
                onChange(u._id);
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                selected === u._id ? "bg-gray-100" : ""
              }`}
            >
              <img
                src={u.avatar}
                alt={u.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-gray-500">
                  {u.totalPoints || 0} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

