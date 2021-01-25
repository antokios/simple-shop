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

const Products = () => {
    const addProduct = () => {
        console.log('Add Product!!!');
    };

    const editProduct = () => {
        console.log('Edit Product!!!');
    };

    const deleteProduct = () => {
        console.log('Delete Product!!!');
    };

    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
                addAction={addProduct}
                editAction={editProduct}
                deleteAction={deleteProduct}
            />
        </div>
    );
};

export default Products;