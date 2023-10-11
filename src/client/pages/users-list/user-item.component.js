import React from 'react';
import { ListGroup, Button, Form, Row, Col, Image } from 'react-bootstrap';
import useUsernamesInformation from '../../hooks/useUsernamesInformation'
import ClassicSpinner from '../../components/spinner'
import { useTranslation } from 'react-i18next';
import { GlobalStateContext } from '../../App';
import { useContext } from 'react';
import {BsFillTrashFill} from "react-icons/bs";

const UserItem = ({ user, dispatchUsers }) => {

    const [userData, isLoading, apiError] = useUsernamesInformation(user);
    const { t } = useTranslation();
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const userSelected = userData.summonerData && globalState.selectedUserName === userData.summonerData.name

    const deleteUserName = (e) => {
        e.preventDefault()
        dispatchUsers({ type: "DELETE", userName: e.target.userName.value })
    }

    return (
        <>
            {
                isLoading
                    ?
                    <ClassicSpinner />
                    :
                    Object.keys(apiError).length !== 0
                        ?
                        <ListGroup.Item className='users-list bg-light' as="li">
                            <Form onSubmit={(e) => deleteUserName(e)} className="d-flex justify-content-between align-items-start" >
                                <div>
                                    <p className='user-name-lvl'>API error loading {user} : {apiError.code}</p>
                                </div>
                                <Form.Control name="userName" type="text" value={user} readOnly className="d-none" />
                                <Button variant="danger" type="submit" className='ms-2'>Delete</Button>
                            </Form>
                        </ListGroup.Item >
                        :
                        <Form onSubmit={(e) => deleteUserName(e)}>
                            <Row className='mb-2'>
                                <Col md={10} className={'pe-0 user-row'}>
                                    <ListGroup.Item
                                        className={(userSelected ? 'user-row-selected' : '') + ' bg-white user-item'}
                                        as="li"
                                        onClick={() => setGlobalState({ ...globalState, selectedUserId: userData.summonerData.id, selectedUserName: userData.summonerData.name, selectedPuuid: userData.summonerData.puuid })}
                                    >
                                        <Row>
                                            <Col md={"6"}>
                                                <p className='user-name-lvl'>{userData.summonerData.name} lv. {userData.summonerData.summonerLevel}</p>
                                                {userData.rankingData.map(element => {
                                                    return (
                                                        <div key={element.queueType}>
                                                            <p className='user-rank'> {t(element.queueType)} : {element.tier} {element.rank} {element.leaguePoints}LP</p>
                                                            <p className='user-rank'> {element.wins}W / {element.losses}L ({Math.round(element.wins / (element.wins + element.losses) * 100)}% Winrate)</p>
                                                        </div>
                                                    )
                                                })}
                                            </Col>
                                            <Col md={4}>
                                                {userData.rankingData.map(element => {
                                                    if (t(element.queueType) === "SoloQ")
                                                        return (
                                                            <Image
                                                                width="100%"
                                                                src={"../old-ranks/emblem-" + element.tier + ".png"} key={element.tier} />
                                                        )
                                                })}
                                            </Col>
                                        </Row>
                                        <Form.Control name="userName" type="text" value={user} readOnly className="d-none" />
                                    </ListGroup.Item >
                                </Col>
                                <Col md={2} className='ps-0'>
                                    <Button variant="danger" type="submit" className={'delete-user'}><BsFillTrashFill/></Button>
                                </Col>
                            </Row >
                        </Form>
            }
        </>
    );

}

export default (UserItem);