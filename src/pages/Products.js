import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Space } from 'antd';
import DataTable from '../components/DataTable';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Image URL',
        dataIndex: 'imageUrl',
    },
    {
        title: 'Stock Quantity',
        dataIndex: 'stockQty',
    },
];

const Products = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setIsLoading(true);

        axios.get('http://localhost:4000/products/')
            .then((res) => {
                if (res.status === 200) {
                    const data = res?.data;

                    if (data?.length > 0) {
                        let productData = [];
                        for (let product of data) {
                            product.key = product._id;
                            productData.push(product);
                        }

                        setProductData(productData);
                    }
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

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
            {isLoading ?
                <Space size="middle">
                    <Spin size="large" />
                </Space>
                :
                <DataTable
                    data={productData}
                    columns={columns}
                    addAction={addProduct}
                    editAction={editProduct}
                    deleteAction={deleteProduct}
                />
            }
        </div>
    );
};

export default Products;