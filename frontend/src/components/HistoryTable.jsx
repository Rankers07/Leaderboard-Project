// import React from 'react';

// export default function HistoryTable({ data = [] }) {
//   return (
//     <div className="panel-card history">
//       <h4 style={{margin:0}}>Claim History</h4>
//       <div style={{marginTop:8}}>
//         {data.slice(0,8).map((h) => (
//           <div key={h._id} className="history-item">
//             <div style={{display:'flex',alignItems:'center',gap:10}}>
//               <img src={h.user?.avatar} alt={h.user?.name} style={{width:36,height:36,borderRadius:8}}/>
//               <div>
//                 <div style={{fontWeight:700}}>{h.user?.name}</div>
//                 <small>{new Date(h.createdAt).toLocaleString()}</small>
//               </div>
//             </div>
//             <div style={{fontWeight:800,color:'#333'}}>{h.points} pts</div>
//           </div>
//         ))}
//         {data.length === 0 && <div style={{padding:12,color:'#666'}}>No history yet</div>}
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function HistoryTable({ data = [] }) {
  const [open, setOpen] = useState(false);

  const visibleData = open ? data : data.slice(0, 4);

  return (
    <div className="panel-card history bg-white rounded-xl shadow p-4">
      <h4 className="text-lg font-semibold m-0">Claim History</h4>

      {/* History List */}
      <div
        className={`mt-3 transition-all duration-300 ${
          open ? "max-h-80 overflow-y-scroll hide-scrollbar" : "max-h-fit"
        }`}
      >
        {visibleData.length > 0 ? (
          visibleData.map((h) => (
            <div
              key={h._id}
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={h.user?.avatar}
                  alt={h.user?.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <div className="font-medium">{h.user?.name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(h.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="font-bold text-gray-700">{h.points} pts</div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-gray-500">No history yet</div>
        )}
      </div>

      {/* Dropdown Toggle */}
      {data.length > 4 && (
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center gap-2 w-full mt-3 px-3 py-2 border rounded-lg text-sm font-medium bg-gray-50 hover:bg-gray-100"
        >
          {open ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

