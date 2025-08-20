// import React from 'react';

// export default function Leaderboard({ data = [] }) {
//   return (
//     <div className="panel-card leaderboard">
//       <h3 style={{margin:0}}>Leaderboard</h3>
//       <div style={{marginTop:12}}>
//         {data.map((u, idx) => (
//           <div key={u._id || idx} className="lb-row">
//             <div className="lb-rank">{idx+1}</div>
//             <div className="lb-avatar"><img src={u.avatar} alt={u.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
//             <div className="lb-name">{u.name}</div>
//             <div className="lb-points">{u.totalPoints}</div>
//           </div>
//         ))}
//         {data.length === 0 && <div style={{padding:12,color:'#666'}}>No users yet</div>}
//       </div>
//     </div>
//   );
// }






// import React, { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export default function Leaderboard({ data = [] }) {
//   const [open, setOpen] = useState(false);

//   // Agar open hai to pura data, warna sirf top 3
//   const visibleData = open ? data : data.slice(0, 3);

//   return (
//     <div className="panel-card leaderboard bg-white rounded-xl shadow p-4">
//       <h3 className="text-lg font-semibold m-0">Leaderboard</h3>

//       {/* List */}
//       <div
//         className={`mt-3 transition-all duration-300 ${
//           open ? "max-h-80 overflow-y-scroll hide-scrollbar" : "max-h-fit"
//         }`}
//       >
//         {visibleData.length > 0 ? (
//           visibleData.map((u, idx) => (
//             <div
//               key={u._id || idx}
//               className="lb-row flex items-center justify-between border-b py-2"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="lb-rank font-bold w-6 text-center">
//                   {idx + 1}
//                 </div>
//                 <div className="lb-avatar w-10 h-10 rounded-full overflow-hidden">
//                   <img
//                     src={u.avatar}
//                     alt={u.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="lb-name font-medium">{u.name}</div>
//               </div>
//               <div className="lb-points font-semibold text-gray-700">
//                 {u.totalPoints}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="p-3 text-gray-500">No users yet</div>
//         )}
//       </div>

//       {/* Show More / Less */}
//       {data.length > 3 && (
//         <button
//           onClick={() => setOpen(!open)}
//           className="flex items-center justify-center gap-2 w-full mt-3 px-3 py-2 border rounded-lg text-sm font-medium bg-gray-50 hover:bg-gray-100"
//         >
//           {open ? (
//             <>
//               Show Less <ChevronUp className="w-4 h-4" />
//             </>
//           ) : (
//             <>
//               Show More <ChevronDown className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       )}
//     </div>
//   );
// }



import React, { useState } from 'react';
import Select from 'react-select';

export default function Leaderboard({ data = [] }) {
  const [selectedUser, setSelectedUser] = useState(null);

  if (data.length === 0) {
    return (
      <div className="panel-card leaderboard">
        <h3 style={{ margin: 0 }}>Leaderboard</h3>
        <div style={{ padding: 12, color: '#666' }}>No users yet</div>
      </div>
    );
  }

  // First ranker
  const topUser = data[0];

  // Remaining users
  const otherUsers = data.slice(1);

  const options = otherUsers.map((u, idx) => ({
    value: u._id,
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src={u.avatar}
          alt={u.name}
          style={{ width: 24, height: 24, borderRadius: '50%' }}
        />
        <span>{u.name} ({u.totalPoints} pts)</span>
      </div>
    ),
  }));

  return (
    <div className="panel-card leaderboard">
      <h3 style={{ margin: 0 }}>Leaderboard</h3>

      {/* First Ranker Section */}
      <div className="top-ranker">
        <div className="trophy">🏆</div>
        <div className="avatar-box">
          <div className="crown">👑</div>
          <img
            src={topUser.avatar}
            alt={topUser.name}
            className="top-avatar"
          />
        </div>
        <div className="top-meta">
          <div className="top-name">{topUser.name}</div>
          <div className="top-points">{topUser.totalPoints} pts</div>
          <div className="top-rank">Rank #1</div>
        </div>
      </div>

      {/* Other Ranks */}
      <div style={{ marginTop: 12 }}>
        {otherUsers.slice(0, 3).map((u, idx) => (
          <div key={u._id || idx} className="lb-row">
            <div className="lb-rank">{idx + 2}</div>
            <div className="lb-avatar">
              <img
                src={u.avatar}
                alt={u.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="lb-name">{u.name}</div>
            <div className="lb-points">{u.totalPoints}</div>
          </div>
        ))}

        {/* Dropdown for remaining */}
        {otherUsers.length > 3 && (
          <div style={{ marginTop: 12 }}>
            <Select
              options={options}
              value={selectedUser}
              onChange={setSelectedUser}
              placeholder="View More..."
              menuPortalTarget={document.body}
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

