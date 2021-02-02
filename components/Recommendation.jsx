import "./Recommendation.scss";

const Recommendation = props => {

    return (
        <div className="recommendation">
           <div className="title">
                <input type="text" placeholder="Title" onChange={(event) => {} }/>
           </div>
           
            <div className="url" >
            <input type="text" placeholder="URL" onChange={(event) => {} }/>
            </div>

            <div className="comment">
                <input type="text" placeholder="Comments" onChange={(event) => {} }/>
            </div>
        </div>
    );
}

export default Recommendation