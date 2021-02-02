
import "./Grid.scss";

import Card from "./Card";

const Grid = props => {
    const cardInfo = props.cardData
    return (
    <div className="grip-wrapper">
            <Card
                title={cardInfo.Name} 
                description={cardInfo.Owner}
                tags={cardInfo["ML Type"]}
            /> 
    </div>
    );
};

export default Grid;
