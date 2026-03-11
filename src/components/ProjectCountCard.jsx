import React from "react";

function ProjectCountCard(prop){

    const {Data}=prop;
   return (
    <div>
        <div className="active-card">
            <h1 className="active-card-count">{Data.number}</h1>
            <h3 className="activate-card-title">{Data.name}</h3>
        </div>
    </div>
   )
}
export default ProjectCountCard;