import React from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import useUsernamesInformation from '../../hooks/useUsernamesInformation'
import ClassicSpinner from '../globals/spinner'
import { useTranslation } from 'react-i18next';
import { GlobalStateContext } from '../../App';
import { useContext } from 'react';
import { BsFillTrashFill } from "react-icons/bs";
import { ACTIONS } from '../../hooks/useGlobalState'

const UserItem = ({ user }) => {

    const { state, dispatchState } = useContext(GlobalStateContext);

    const [userData, isLoading, apiError] = useUsernamesInformation(user.puuid);
    const { t } = useTranslation();
    const userSelected = userData.summonerData && state.selectedUserName === userData.summonerData.name

    const deleteUserName = (e) => {
        e.preventDefault()
        dispatchState([{ type: ACTIONS.DELETE_USER, puuid: user.puuid }])
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
                        <ListGroup.Item className='users-list user-item mb-2' as="li">
                            <Form onSubmit={(e) => deleteUserName(e)} className="d-flex justify-content-between align-items-start" >
                                <div>
                                    <p className='user-name'>API error loading {user.name} #{user.tag} : {apiError.code}</p>
                                </div>
                                <Form.Control name="userName" type="text" value={user.name} readOnly className="d-none" />
                                <Button variant="danger" type="submit" className='ms-2'>Delete</Button>
                            </Form>
                        </ListGroup.Item >
                        :
                        <Form onSubmit={(e) => deleteUserName(e)}>
                            <Row className='mb-2'>
                                <Col md={10} className={'pe-0 user-row'}>
                                    <ListGroup.Item
                                        className={(userSelected ? 'user-row-selected' : '') + ' user-item'}
                                        as="li"
                                        onClick={() => {
                                            dispatchState([{
                                                type: ACTIONS.DEFAULT_UPDATE, updateObject: {
                                                    selectedUserId: userData.summonerData.id,
                                                    selectedUserName: userData.summonerData.name,
                                                    selectedPuuid: userData.summonerData.puuid
                                                }
                                            }])
                                        }}
                                    >
                                        <Row>
                                            <Col md={4}>
                                                <div className='user-name'>
                                                    {userData.summonerData.name}
                                                </div>
                                                <div className='tag-username'>
                                                    #{user.tag}
                                                </div>
                                            </Col>
                                            <Col md={8}>
                                                {userData.rankingData.map(element => {
                                                    if (t(element.queueType) === "SoloQ")
                                                        return (
                                                            <Row key={element.queueType}>
                                                                <Col md={5}>
                                                                    <span className='user-rank-title'> {t(element.tier + " " + element.rank)}</span><br />
                                                                    <span className='user-rank-details'>{element.leaguePoints}</span><span className='user-lp-annotation'>LP</span>
                                                                </Col>
                                                                <Col md={7}>
                                                                    <span className='user-rank-title'>Win Rate</span><br />
                                                                    <span className='user-rank-details'>{Math.round(element.wins / (element.wins + element.losses) * 100)}%</span><br />
                                                                    <span className='user-rank-sub'>{element.wins}W / {element.losses}L</span>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    return <></>
                                                })}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item >
                                </Col>
                                <Col md={2} className='ps-0'>
                                    <Button variant="danger" type="submit" className={'delete-user'}><BsFillTrashFill /></Button>
                                </Col>
                            </Row >
                        </Form>
            }
        </>
    );

}

export default React.memo(UserItem);