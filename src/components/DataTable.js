import { Table } from 'antd';
import './DataTable.css';

const DataTable = (props) => {
    return (
        <div className="Table">
            <Table
                rowSelection={{
                    type: 'radio',
                    ...props.rowSelection,
                }}
                columns={props.columns}
                dataSource={props.data}
            />
        </div>
    );
};

export default DataTable;