import React from 'react';
import {onlineIcon} from '../../icons'
import './UsersList.css';

const UsersList = ({ users }) => {
    console.log("in lists usrs prop: ", users);
    return (
        <div className="textContainer">
            <div>
                <h1>Realtime simple chat app!</h1>
                <h2>Stack: React, Socket.io and Node <span role="img" aria-label="emoji">&hearts;</span></h2>
                <h2>Wanna check it out? <span role="img" aria-label="emoji">&#8592;</span></h2>
            </div>
            {users ? <div>
                <h1>Currently online users:</h1>
                <div className="activeContainer">
                    <h4>
                        {users.map(user => <div key={user.id} className="activeItem">
                            {user.name}
                            <img src={onlineIcon} alt="Online Icon"/>
                        </div>
                        )}
                    </h4>
                </div>
            </div>
                : null
            }
        </div>
    );
}

export default UsersList;