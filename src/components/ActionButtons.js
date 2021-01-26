import { Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './ActionButtons.css';

const ActionButtons = (props) => {
    return (
        <div className="ButtonGroup">
            <Button type="primary" shape="round" icon={<PlusOutlined />} className="ActionButton" onClick={props.addAction}>Add</Button>
            <Button type="primary" shape="round" icon={<EditOutlined />} className="ActionButton" onClick={props.editAction}>Edit</Button>
            <Button danger type="primary" shape="round" icon={<DeleteOutlined />} className="ActionButton" onClick={props.deleteAction}>Delete</Button>
        </div>
    );
};

export default ActionButtons;