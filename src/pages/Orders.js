import DataTable from '../components/DataTable';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];

const Orders = () => {
    const addOrder = () => {
        console.log('Add Order!!!');
    };

    const editOrder = () => {
        console.log('Edit Order!!!');
    };

    const deleteOrder = () => {
        console.log('Delete Order!!!');
    };

    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
                addAction={addOrder}
                editAction={editOrder}
                deleteAction={deleteOrder}
            />
        </div>
    );
};

export default Orders;