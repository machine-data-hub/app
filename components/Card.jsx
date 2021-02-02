import "./Card.scss";
// Style



const Card = props => {
    
    return (
        <div className="card-template">
            <div className="title">{props.title}</div>
            <div className="description">{props.description}</div>
            <div className="tag">{props.tags}</div>
        </div>
    );
};


export default Card;