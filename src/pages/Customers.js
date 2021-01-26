import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Space } from 'antd';
import DataTable from '../components/DataTable';
import ActionButtons from '../components/ActionButtons';
import ActionModal from '../components/ActionModal';

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
    const [modalFormData, setModalFormData] = useState([]);
    const [modalType, setModalType] = useState(undefined);
    
    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        setIsLoading(true);
        axios.get('http://localhost:4000/customers/')
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
        setModalType('Edit Customer');
        setIsModalVisible(true);
    };

    const deleteCustomer = () => {
        setModalType('Delete Customer');
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (modalType) {
            if (modalType.includes('Add')) {
                console.log('Added Customer!');
            } else if (modalType.includes('Edit')) {
                console.log('Edited Customer!');
            } else if (modalType.includes('Delete')) {
                console.log('Deleted Customer!');
            }
        }
        setIsModalVisible(false);
        setModalType(undefined);
        setModalFormData([]);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalType(undefined);
        setModalFormData([]);
    };

    return (
        <div>
            {isLoading ?
                <Space size="middle">
                    <Spin size="large" />
                </Space>
                :
                <>
                    <ActionModal isVisible={isModalVisible} formData={modalFormData} modalTitle={modalType} okAction={handleOk} cancelAction={handleCancel} />
                    <DataTable data={customerData} columns={columns} />
                    <ActionButtons addAction={addCustomer} editAction={editCustomer} deleteAction={deleteCustomer} />
                </>
            }
        </div>
    );
};

export default Customers;