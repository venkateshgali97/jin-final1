import React, { useState, useEffect } from 'react';
import "../../Style/Admin/Users.css";
import { Button, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import AddUserApi from "../../Service/Admin/UserApi";
const addUserApi = new AddUserApi()
function Users() {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [userData, setUserData] = useState([]);
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        contact_no: '',
        dob: '',
        designation: '',
        emerg_contact: '',
        blood_grp: '',
        doj: '',
    });
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [isFormValid, setFormValid] = useState(true);
    const getAllUsersData = async () => {

        let response = await addUserApi.getAllUsers()
        console.log(response)
        setUserData(response)


    }


    useEffect(() => {
        getAllUsersData();

    }, [])
    const handleAccordionClick = (accordionId) => {
        setActiveAccordion((prevAccordion) =>
            prevAccordion === accordionId ? null : accordionId
        );
    };

    // Function to toggle the Add User modal
    const toggleAddUserModal = () => {
        setNewUser({
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            contact_no: '',
            dob: '',
            designation: '',
            emerg_contact: '',
            blood_grp: '',
            doj: '',
        });
        setAddUserModalOpen((prevIsOpen) => !prevIsOpen);
    };

    // Function to toggle the Update User form modal
    const toggleUpdateUser = (index) => {
        setSelectedUserIndex(index);
        setNewUser(userData[index]); // Initialize the form with the data of the selected user
        setUpdateUserModalOpen((prevIsOpen) => !prevIsOpen);
    };

    // Function to handle input changes in the Add User form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser((prevNewUser) => ({
            ...prevNewUser,
            [name]: value,
        }));
    };

    // Function to handle form submission for adding a new user
    const handleSubmit = async() => {
        // Check if all required fields are filled
        const isFormValid =
            newUser.first_name.trim() !== '' &&
            newUser.last_name.trim() !== '' &&
            newUser.email.trim() !== '' &&
            newUser.contact_no.trim() !== '' &&
            newUser.dob.trim() !== '' &&
            newUser.designation.trim() !== '' &&
            newUser.emerg_contact.trim() !== '' &&
            newUser.blood_grp.trim() !== '' &&
            newUser.doj.trim() !== '';

        // Update isFormValid state based on form validity
        setFormValid(isFormValid);

        if (isFormValid) {
            setUserData((prevUserData) => [...prevUserData, newUser]);
            const response = await addUserApi.AddUser(newUser)
            console.log(response, "this is frontend response")
            if (response.status){
                toast.success("user added successfully Added successfully")
               
             }
            else{
                toast.error("something went wrong")
            }

            // Clear the form fields
            setNewUser({
                id: '',
                first_name: '',
                last_name: '',
                email: '',
                contact_no: '',
                dob: '',
                designation: '',
                emerg_contact: '',
                blood_grp: '',
                doj: '',
            });
            setAddUserModalOpen(false);

            // Log new user data to console
            console.log('New User:', newUser);
        }
    };

    // Function to handle form submission for updating a user
    const handleUpdate = async (id) => {
        // Check if all required fields are filled
        const isFormValid =
            newUser.first_name.trim() !== '' &&
            newUser.last_name.trim() !== '' &&
            newUser.email.trim() !== '' &&
            newUser.contact_no.trim() !== '' &&
            newUser.dob.trim() !== '' &&
            newUser.designation.trim() !== '' &&
            newUser.emerg_contact.trim() !== '' &&
            newUser.blood_grp.trim() !== '' &&
            newUser.doj.trim() !== '';

        // Update isFormValid state based on form validity
        setFormValid(isFormValid);

        if (isFormValid) {
            const updatedUserData = [...userData];
            updatedUserData[selectedUserIndex] = newUser;
            const response = await addUserApi.updateUser(id, newUser)
            if (response) {
                toast.success("User Information updated successfully.")
            }
            setUserData(updatedUserData);
            setNewUser({
                id: '',
                first_name: '',
                last_name: '',
                email: '',
                contact_no: '',
                dob: '',
                designation: '',
                emerg_contact: '',
                blood_grp: '',
                doj: '',
            });
            setUpdateUserModalOpen(false);

            // Log updated user data to console
            console.log('Updated User:', newUser);
        }
    };

    // Function to handle form submission for deleting a user
    const handleDelete = async (id) => {
        // const updatedUserData = userData.filter((user) => user.id !== userId);
        // setUserData(updatedUserData);
        // setUpdateUserModalOpen(false);
        const response = await addUserApi.deleteUser(id)
        if (response) {
            getAllUsersData();
            toast.success('User Deleted successfully')
        }

      
    };

    return (
        <div className="users-container">
            <div className="accordion users-accordion-item" id="sidebarAccordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="users">
                        <button
                            className={`accordion-button accordion-button-custom ${activeAccordion === 'users' ? '' : 'collapsed'
                                }`}
                            type="button"
                            onClick={() => handleAccordionClick('users')}
                        >
                            Users
                        </button>
                    </h2>
                    <div
                        id="collapseUsers"
                        className={`accordion-collapse collapse ${activeAccordion === 'users' ? 'show' : ''
                            }`}
                        aria-labelledby="users"
                        data-bs-parent="#sidebarAccordion"
                    >
                        <div className="accordion-body">
                            {activeAccordion === 'users' && (
                                <>
                                    <table className="tables">
                                        <thead>
                                            <tr>
                                                <th>First-Name</th>
                                                <th>Last-Name</th>
                                                <th>Email</th>
                                                <th>Contact-no</th>
                                                <th>Dob</th>
                                                <th>Designation</th>
                                                <th>Emerg-contact</th>
                                                <th>Blood-grp</th>
                                                {/* <th>Password</th> */}
                                                <th>Doj</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData && userData.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.contact_no}</td>
                                                    <td>{user.dob}</td>
                                                    <td>{user.designation}</td>
                                                    <td>{user.emerg_contact}</td>
                                                    <td>{user.blood_grp}</td>
                                                    {/* <td>{user.password}</td> */}
                                                    <td>{user.doj}</td>
                                                    <td>
                                                        <button

                                                            className="btn-update1 btn-primary"
                                                            onClick={() => toggleUpdateUser(index)}
                                                        >
                                                            {/* <FontAwesomeIcon icon={faEdit} />  */}
                                                            Update
                                                        </button>
                                                        <button

                                                            className="btn-delete btn-danger"
                                                            onClick={() => handleDelete(user.id)}
                                                        >
                                                            Delete
                                                            {/* <FontAwesomeIcon icon={faTrash} />  */}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button
                                        className="btn-success btn-add fixed-button"
                                        onClick={toggleAddUserModal}
                                    >
                                        Add User
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={isAddUserModalOpen} onHide={toggleAddUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="first_name">
                            <Form.Label>First-Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={newUser.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="last_name">
                            <Form.Label>Last-Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={newUser.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="contact_no">
                            <Form.Label>Contact-no:</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact_no"
                                value={newUser.contact_no}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Dob:</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={newUser.dob}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="designation">
                            <Form.Label>Designation:</Form.Label>
                            <Form.Control
                                type="text"
                                name="designation"
                                value={newUser.designation}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="emerg_contact">
                            <Form.Label>Emerg-contact:</Form.Label>
                            <Form.Control
                                type="text"
                                name="emerg_contact"
                                value={newUser.emerg_contact}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="blood_grp">
                            <Form.Label>Blood-grp:</Form.Label>
                            <Form.Control
                                type="text"
                                name="blood_grp"
                                value={newUser.blood_grp}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="doj">
                            <Form.Label>Doj:</Form.Label>
                            <Form.Control
                                type="date"
                                name="doj"
                                value={newUser.doj}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                    {!isFormValid && (
                        <p className="text-danger">Please fill in all required fields.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Update User modal */}
            <Modal show={isUpdateUserModalOpen} onHide={() => setUpdateUserModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="first_name">
                            <Form.Label>First-Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={newUser.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="last_name">
                            <Form.Label>Last-Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={newUser.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="contact_no">
                            <Form.Label>Contact-no:</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact_no"
                                value={newUser.contact_no}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="dob">
                            <Form.Label>Dob:</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={newUser.dob}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="designation">
                            <Form.Label>Designation:</Form.Label>
                            <Form.Control
                                type="text"
                                name="designation"
                                value={newUser.designation}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="emerg_contact">
                            <Form.Label>Emerg-contact:</Form.Label>
                            <Form.Control
                                type="text"
                                name="emerg_contact"
                                value={newUser.emerg_contact}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="blood_grp">
                            <Form.Label>Blood-grp:</Form.Label>
                            <Form.Control
                                type="text"
                                name="blood_grp"
                                value={newUser.blood_grp}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={newUser.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="doj">
                            <Form.Label>Doj:</Form.Label>
                            <Form.Control
                                type="date"
                                name="doj"
                                value={newUser.doj}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                    {!isFormValid && (
                        <p className="text-danger">Please fill in all required fields.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleUpdate(newUser.id)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Users;
