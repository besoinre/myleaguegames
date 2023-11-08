import React from 'react';
import { runesIconLink } from '../../constants/constants';
import { Col, Image } from 'react-bootstrap';
import TooltipDescription from './tooltip-description';

const SummonerRunes = ({ primaryName, primaryIcon, secondaryName, secondaryIcon, size }) => (
    <Col md={"auto d-flex flex-column px-1"}>
        <TooltipDescription title={primaryName}>
            <Image
                width={size}
                src={runesIconLink(primaryIcon)}
                alt={primaryName}
            />
        </TooltipDescription>
        <TooltipDescription title={secondaryName}>
            <Image
                width={size}
                src={runesIconLink(secondaryIcon)}
                alt={secondaryName}
            />
        </TooltipDescription>
    </Col>
);

export default React.memo(SummonerRunes)