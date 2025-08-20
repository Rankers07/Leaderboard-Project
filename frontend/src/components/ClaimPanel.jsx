import React from 'react';

export default function ClaimPanel({ user, onClaim }) {
  return (
    <div className="panel-card claim-panel">
      <h4 style={{margin:0}}>Claim Points</h4>
      <div className="claim-user" style={{marginTop:8}}>
        {user ? (
          <>
            <img src={user.avatar} alt={user.name} style={{width:68,height:68,borderRadius:12}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:16}}>{user.name}</div>
              <div style={{color:'#666'}}>{user.totalPoints || 0} points</div>
            </div>
            <button className="claim-btn" onClick={onClaim}>Claim</button>
          </>
        ) : (
          <div style={{color:'#666'}}>Select a user to claim</div>
        )}
      </div>
    </div>
  );
}
