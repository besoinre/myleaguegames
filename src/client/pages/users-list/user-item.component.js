import React from 'react';
import { ListGroup, Button, Form, Toast } from 'react-bootstrap';
import useUsernamesInformation from '../../hooks/useUsernamesInformation'
import { BsDashCircleFill } from "react-icons/bs";
import ClassicSpinner from '../../components/spinner'
import { useTranslation } from 'react-i18next';

const UserItem = (props) => {

    let user = props.user
    let [userData, isLoading, apiError] = useUsernamesInformation(props.user);
    let onSubmit = props.onSubmit
    let index = props.index

    const { t } = useTranslation();
    return (
        <>
            <Toast
                autohide={true}
            >
                <Toast.Header>
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>
            {
                isLoading
                    ?
                    <ClassicSpinner />
                    :
                    Object.keys(apiError).length !== 0
                        ?
                        <Toast
                            className="d-inline-block m-1"
                            bg="danger"
                            autohide={true}
                            delay={1000}
                            key={user}
                        >
                            <Toast.Body>
                                <strong>{user} was not found</strong>
                            </Toast.Body>
                        </Toast>
                        :
                        <ListGroup.Item key={user} className='users-list' as="li">
                            <Form onSubmit={onSubmit} className="d-flex justify-content-between align-items-start" >
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
                                <Form.Control name="index" type="text" value={index} readOnly className="d-none" />
                                <Button variant="danger" type="submit" ><BsDashCircleFill /></Button>
                            </Form>
                        </ListGroup.Item >
            }
        </>
    );

}

export default (UserItem);