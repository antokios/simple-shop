import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Space, Modal, Input } from 'antd';
import DataTable from '../components/DataTable';
import ActionButtons from '../components/ActionButtons';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
    },
];

const Customers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [customerData, setCustomerData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState(undefined);
    const [selectedCustomerId, setSelectedCustomerId] = useState(undefined);
    const [newCustomerEmail, setNewCustomerEmail] = useState('');
    const [newCustomerFirstName, setNewCustomerFirstName] = useState('');
    const [newCustomerLastName, setNewCustomerLastName] = useState('');

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        setIsLoading(true);
        axios.get('https://node-simple-shop.herokuapp.com/customers')
            .then((res) => {
                if (res.status === 200) {
                    const data = res?.data;

                    if (data?.length > 0) {
                        let customerData = [];
                        for (let customer of data) {
                            customer.key = customer._id;
                            customerData.push(customer);
                        }

                        setCustomerData(customerData);
                    }
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const addCustomer = () => {
        setModalType('Add New Customer');
        setIsModalVisible(true);
    };

    const editCustomer = () => {
        if (selectedCustomerId) {
            const selectedCustomer = selectedCustomerId ? customerData.find((element) => element._id === selectedCustomerId[0]) : undefined;
            setModalType('Edit Customer');
            setNewCustomerEmail('' +  selectedCustomer.email);
            setNewCustomerFirstName('' +  selectedCustomer.firstName);
            setNewCustomerLastName('' +  selectedCustomer.lastName);
            setIsModalVisible(true);
        }
    };

    const deleteCustomer = () => {
        if (selectedCustomerId) {
            setModalType('Delete Customer');
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        if (modalType) {
            if (modalType.includes('Add')) {
                setIsLoading(true);
                if (newCustomerEmail?.length > 0 && newCustomerFirstName?.length > 0 && newCustomerLastName?.length > 0) {
                    axios.post(`https://node-simple-shop.herokuapp.com/customers/`, {
                        firstName: newCustomerFirstName,
                        lastName: newCustomerLastName,
                        email: newCustomerEmail
                    })
                        .then((res) => {
                            setTimeout(() => {
                                getCustomers();
                            }, 100);
                        })
                        .catch((err) => {
                            setIsLoading(false);
                        });
                }
            } else if (modalType.includes('Edit')) {
                setIsLoading(true);
                if (newCustomerEmail?.length > 0 && newCustomerFirstName?.length > 0 && newCustomerLastName?.length > 0) {
                    axios.put(`https://node-simple-shop.herokuapp.com/customers/${selectedCustomerId}`, {
                        firstName: newCustomerFirstName,
                        lastName: newCustomerLastName,
                        email: newCustomerEmail
                    })
                        .then((res) => {
                            setTimeout(() => {
                                getCustomers();
                            }, 100);
                        })
                        .catch((err) => {
                            setIsLoading(false);
                        });
                }
            } else if (modalType.includes('Delete')) {
                setIsLoading(true);
                axios.delete(`https://node-simple-shop.herokuapp.com/customers/${selectedCustomerId}`)
                    .then((res) => {
                        setTimeout(() => {
                            getCustomers();
                        }, 100);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                    });
            }
        }
        setIsModalVisible(false);
        setModalType(undefined);
        setSelectedCustomerId(undefined);
        setNewCustomerEmail('');
        setNewCustomerFirstName('');
        setNewCustomerLastName('');        
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalType(undefined);
        setSelectedCustomerId(undefined);
        setNewCustomerEmail('');
        setNewCustomerFirstName('');
        setNewCustomerLastName('');        
    };

    const rowSelection = {
        onChange: (selectedRowKey, selectedRow) => {
            setSelectedCustomerId(selectedRowKey);
        },
    };

    const onEmailChange = (e) => {
        const { value } = e.target;
        setNewCustomerEmail(value?.trim());
    };

    const onFirstNameChange = (e) => {
        const { value } = e.target;
        setNewCustomerFirstName(value?.trim());
    };

    const onLastNameChange = (e) => {
        const { value } = e.target;
        setNewCustomerLastName(value?.trim());
    };

    const renderModal = () => {
        if (modalType && isModalVisible) {
            if (modalType.includes('Add')) {

                return (
                    <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder={'Email'} onChange={onEmailChange} />
                        <p />
                        <Input placeholder={'First Name'} onChange={onFirstNameChange} />
                        <p />
                        <Input placeholder={'Last Name'} onChange={onLastNameChange} />
                    </Modal>
                );
            } else if (modalType.includes('Edit')) {
                const selectedCustomer = selectedCustomerId ? customerData.find((element) => element._id === selectedCustomerId[0]) : undefined;
                return (
                    <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder={'Email'} defaultValue={selectedCustomer.email} onChange={onEmailChange} />
                        <p />
                        <Input placeholder={'First Name'} defaultValue={selectedCustomer.firstName} onChange={onFirstNameChange} />
                        <p />
                        <Input placeholder={'Last Name'} defaultValue={selectedCustomer.lastName} onChange={onLastNameChange} />
                    </Modal>
                );
            } else if (modalType.includes('Delete')) {
                const selectedCustomer = selectedCustomerId ? customerData.find((element) => element._id === selectedCustomerId[0]) : undefined;
                return (
                    <Modal title={modalType} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>{`Are you sure you want to delete ${selectedCustomer.firstName} ${selectedCustomer.lastName}?`}</p>
                    </Modal>
                );
            }
        } else {
            return null;
        }
    };

    return (
        <div>
            {isLoading ?
                <Space size="middle">
                    <Spin size="large" />
                </Space>
                :
                <>
                    {renderModal()}
                    <DataTable data={customerData} columns={columns} rowSelection={rowSelection} />
                    <ActionButtons addAction={addCustomer} editAction={editCustomer} deleteAction={deleteCustomer} />
                </>
            }
        </div>
    );
};

export default Customers;