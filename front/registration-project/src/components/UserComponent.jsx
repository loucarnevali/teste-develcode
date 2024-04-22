import { createUser, getUser, updateUser } from '../services/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserComponent = () => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [photo, setPhoto] = useState(null);

  const { id } = useParams();
  const [errors, setErrors] = useState({
    name: '',
    dateOfBirth: '',
    photo: '',
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((response) => {
          setName(response.data.name);
          setDateOfBirth(response.data.dateOfBirth);
          setPhoto(response.data.photo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handlePhotoChange = (file) => {
    setPhoto(file);
  };

  function saveOrUpdateUser(e) {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('photo', photo);

      if (id) {
        updateUser(id, formData)
          .then((response) => {
            console.log(response.data);
            navigator('/users');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createUser(formData)
          .then((response) => {
            console.log(response.data);
            navigator('/users');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'Name is required';
      valid = false;
    }

    if (dateOfBirth.trim()) {
      errorsCopy.dateOfBirth = '';
    } else {
      errorsCopy.dateOfBirth = 'Date of birth is required';
      valid = false;
    }

    // if (photo.trim()) {
    //   errorsCopy.photo = '';
    // } else {
    //   errorsCopy.photo = 'Photo is required';
    //   valid = false;
    // }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update User</h2>;
    } else {
      return <h2 className="text-center">Add User</h2>;
    }
  }

  return (
    <div className="container" style={{ height: '100vh' }}>
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  name="name"
                  value={name}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  onChange={(e) => setName(e.target.value)}
                ></input>

                {errors.name && (
                  <div className="invalid-feedback"> {errors.name} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Date of Birth:</label>
                <input
                  type="date"
                  placeholder="Enter User Date of Birth"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  className={`form-control ${
                    errors.dateOfBirth ? 'is-invalid' : ''
                  }`}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                ></input>
                {errors.dateOfBirth && (
                  <div className="invalid-feedback"> {errors.dateOfBirth} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Photo:</label>
                <input
                  type="file"
                  name="photo"
                  className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                  onChange={(e) => handlePhotoChange(e.target.files[0])}
                ></input>
                {errors.photo && (
                  <div className="invalid-feedback"> {errors.photo} </div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateUser}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
