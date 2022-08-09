import React, {useState} from 'react';
import './Rating.css';

const Rating = (props) => {
    const emptyIcon =  '/icons/stars/empty.svg';
    const filledIcon =  '/icons/stars/filled.svg';
    const halfFilledIcon =  '/icons/stars/half.svg';

    const [activeStar, setActiveStar] = useState(-1);
    const [halfStar, setHalfStar] = useState(0.5);
    const [hover, setHover] = useState(-1);

    // Utility function to calculate if the mouse event happened on the left side of the target or the right side.
    const isLessThanHalf = (event) => {
        const {target} = event;
        const boundingClientRect = target.getBoundingClientRect();
        let mouseAt = event.clientX - boundingClientRect.left;
        mouseAt = Math.round(Math.abs(mouseAt));
        return mouseAt < boundingClientRect.width / 2;
    };

    const handleClick = (e, index) => {
        console.log('click :', index)
        if (!isLessThanHalf(e)) {
            setActiveStar(index)
        } else {
            setActiveStar(index + 0.5)
        }
        
    }

    const hoverRating = (e, index) => {
        console.log(isLessThanHalf(e))
        if (!isLessThanHalf(e)) {
            setHalfStar(1)
        } else {
            setHalfStar(0.5)
        }
        setHover(index)
    }

    const getStarIconUrl = (index) => {
        console.log('activeStar :', activeStar)
        // console.log('halfStar :', halfStar)
        // console.log('index :', index)
        if (activeStar > 0 && index === hover) {
            if (halfStar < 1 || (activeStar - index === halfStar)) {
                console.log('half')
                return halfFilledIcon
            } else {
                console.log('1')
                return filledIcon
            }
        } else {
            if ((halfStar < 1) && index == hover && hover > activeStar) {
                console.log('2')
                return halfFilledIcon
            } else {
                if (index <= activeStar || index <= hover) {
                    return filledIcon
                } else {
                    return emptyIcon
                }
            }
        }
    }

    const renderSymbol = () => {
        const totalStar = 5;
        return (
            <>
              {[...new Array(totalStar)].map((star, index) => {
                return (
                    <img src={getStarIconUrl(index)}
                        key={index}
                        className="rating-image"
                        data-testid="rating-icon"
                        onClick={(e) => handleClick(e, index)}
                        onMouseEnter={(e) => hoverRating(e, index)}
                        onMouseLeave={(e) => hoverRating(e, -1)}
                        alt="Rate"/>
                  
                )
              })}
            </>
        )
    }

    return (
        <div
            tabIndex="0"
            className="star-rating"
            data-testid="star-rating-container"
        >
            {
                renderSymbol()
            }
        </div>
    )
};


export default Rating;
