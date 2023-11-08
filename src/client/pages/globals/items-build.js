import React from 'react'
import { itemKeys, itemIconLink, trinketKey } from '../../constants/constants';
import { BsFillStopFill } from 'react-icons/bs';
import { Image } from 'react-bootstrap';

const ItemsBuild = ({ participant, size }) => {

    return (<>
        {
            itemKeys.filter((element) => (
                participant[element] !== 0
            )).map((element, index) =>
            (
                <Image
                    key={"tooltip-" + index + "-" + participant[element]}
                    className='participant-item'
                    width={size}
                    src={itemIconLink(participant[element])}
                    alt={"item" + participant[element]}
                />
            )
            )
        }
        {
            itemKeys.filter((element) => (
                participant[element] === 0
            )).map((element, index) =>
                <BsFillStopFill
                    className='empty-item participant-item'
                    key={"emptyItem-" + index}
                    size={size}
                />
            )
        }
        <Image
            className='participant-item'
            width={size}
            src={itemIconLink(participant[trinketKey])}
            alt={"item" + participant[trinketKey]}
        />
    </>
    )
}

export default React.memo(ItemsBuild)