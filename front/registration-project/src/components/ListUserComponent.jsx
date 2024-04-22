import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../services/UserService';

export default function ListUserComponent() {
  const [users, setUsers] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewUser() {
    navigator('/add-user');
  }

  function updateUser(id) {
    navigator(`/edit-user/${id}`);
  }

  function removeUser(id) {
    console.log(id);

    deleteUser(id)
      .then((response) => {
        getAllUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Função para formar a URL completa da imagem
  // function getFullImageUrl(photoUrl) {
  //   return `http://localhost:8080${photoUrl}`;
  // }

  return (
    <div className="container-fluid p-3 " style={{ height: '100%' }}>
      <h2 className="text-center">List of Users </h2>
      <button className="btn btn-primary mb-2" onClick={addNewUser}>
        Add User
      </button>
      <table className="table table-striped table-bordered text-center">
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>User Date of Birth</th>
            <th>User Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.dateOfBirth}</td>
              <td>
                {user.photoUrl && (
                  <img
                    src={`http://localhost:8080${user.photoUrl}`} // URL completa da imagem
                    alt="User"
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateUser(user.id)}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => removeUser(user.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
