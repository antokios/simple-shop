import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Space } from 'antd';
import DataTable from '../components/DataTable';

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
        console.log('Add Customer!!!');
    };

    const editCustomer = () => {
        console.log('Edit Customer!!!');
    };

    const deleteCustomer = () => {
        console.log('Delete Customer!!!');
    };

    return (
        <div>
            {isLoading ?
                <Space size="middle">
                    <Spin size="large" />
                </Space>
                :
                <DataTable
                    data={customerData}
                    columns={columns}
                    addAction={addCustomer}
                    editAction={editCustomer}
                    deleteAction={deleteCustomer}
                />
            }
        </div>
    );
};

export default Customers;