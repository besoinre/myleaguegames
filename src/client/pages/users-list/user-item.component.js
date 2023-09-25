import React from 'react';
import { ListGroup, Button, Form, Toast } from 'react-bootstrap';
import useUsernamesInformation from '../../hooks/useUsernamesInformation'
import { BsDashCircleFill } from "react-icons/bs";
import ClassicSpinner from '../../components/spinner'
import { useTranslation } from 'react-i18next';
import { useState } from "react";

const UserItem = (props) => {

    let user = props.user
    let [userData, isLoading, apiError] = useUsernamesInformation(props.user);
    let removeItem = props.removeItem
    let index = props.index

    const [show, setShow] = useState(true);

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
                        <Form onSubmit={removeItem} className="d-flex justify-content-between align-items-start" >
                            <Toast
                                className="d-inline-block m-1"
                                bg="danger"
                                onClose={() => {
                                    setShow(false)
                                }} 
                                show={show} delay={3000} autohide
                                key={user}
                            >
                                <Toast.Body>
                                    <strong>{user} was not found</strong>
                                </Toast.Body>
                            </Toast>
                            <Form.Control name="index" type="text" value={index} readOnly className="d-none" />
                        </Form>
                        :
                        <ListGroup.Item key={user} className='users-list' as="li">
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
                                <Form.Control name="index" type="text" value={index} readOnly className="d-none" />
                                <Button variant="danger" type="submit" ><BsDashCircleFill /></Button>
                            </Form>
                        </ListGroup.Item >
            }
        </>
    );

}

export default (UserItem);