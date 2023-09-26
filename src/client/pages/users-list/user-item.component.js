import React from 'react';
import { ListGroup, Button, Form, Toast } from 'react-bootstrap';
import useUsernamesInformation from '../../hooks/useUsernamesInformation'
import { BsDashCircleFill } from "react-icons/bs";
import ClassicSpinner from '../../components/spinner'
import { useTranslation } from 'react-i18next';

const UserItem = (props) => {

    let user = props.user
    let [userData, isLoading, apiError] = useUsernamesInformation(props.user);
    let removeItem = props.removeItem
    const { t } = useTranslation();

    return (
        <>
            {
                isLoading
                    ?
                    <ClassicSpinner />
                    :
                    Object.keys(apiError).length !== 0
                        ?
                        <ListGroup.Item className='users-list' as="li">
                            <Form onSubmit={removeItem} className="d-flex justify-content-between align-items-start" >
                                <div>
                                    <p className='user-name-lvl'>API error loading {user} : {apiError.code}</p>
                                </div>
                                <Form.Control name="userName" type="text" value={user} readOnly className="d-none" />
                                <Button variant="danger" type="submit" ><BsDashCircleFill /></Button>
                            </Form>
                        </ListGroup.Item >
                        :
                        <ListGroup.Item className='users-list' as="li">
                            <Form onSubmit={removeItem} className="d-flex justify-content-between align-items-start" >
                                <div>
                                    <p className='user-name-lvl'>{userData.summonerData.name} lv. {userData.summonerData.summonerLevel}</p>
                                    {userData.rankingData.map(element => {
                                        return (
                                            <>
                                                <p className='user-rank'> {t(element.queueType)} : {element.tier} {element.rank} {element.leaguePoints}LP</p>
                                                <p className='user-rank'> {element.wins}W / {element.losses}L</p>
                                            </>

                                        )
                                    })}
                                </div>
                                <Form.Control name="userName" type="text" value={user} readOnly className="d-none" />
                                <Button variant="danger" type="submit" ><BsDashCircleFill /></Button>
                            </Form>
                        </ListGroup.Item >
            }
        </>
    );

}

export default (UserItem);