import React from 'react';


function rowClassNameFormat(index) {
    return index % 2 === 0 ? 'Gold-Row' : 'Silver-Row';
}

const SimpleUserTable = (props) => {
    return (
        <div>
            <table>
                <tbody>
                {props.data.map((user, index) => (
                   <tr key={index} className={rowClassNameFormat(index)}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>
                   </tr>
                ))}
                </tbody>
            </table>
            <p>{props.isFetching ? 'Fetching users...' : ''}</p>
        </div>
    )
};

export default SimpleUserTable;