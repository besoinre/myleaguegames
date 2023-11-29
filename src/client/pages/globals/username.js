import React from 'react'
import { useContext } from 'react'
import { GlobalStateContext } from '../../App';
import { Button, Form } from 'react-bootstrap'
import { ACTIONS } from '../../hooks/useGlobalState'

const Username = ({ name, id, puuid }) => {

    const { dispatchState } = useContext(GlobalStateContext);

    let addUserName = (e) => {
        e.preventDefault();
        dispatchState([
            { type: ACTIONS.ADD_USER, userName: { name: name, puuid: puuid } },
            {
                type: ACTIONS.DEFAULT_UPDATE, updateObject: {
                    selectedUserId: id,
                    selectedUserName: name,
                    selectedPuuid: puuid
                }
            }
        ])
    }

    return (
        <Form onSubmit={addUserName}>
            <Button type="submit" className='button-username'>
                {name}
            </Button>
        </Form>

    )
}

export default React.memo(Username)