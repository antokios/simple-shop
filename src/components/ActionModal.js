import { Modal, Input } from 'antd';

const ActionModal = (props) => {
    console.log(props);

    return (
        <Modal title={props.modalTitle} visible={props.isVisible} onOk={props.okAction} onCancel={props.cancelAction}>
            {props.formData.length > 1 ?
                props.formData.map((val, index) => {
                    return <Input key={index} placeholder={val.title} />
                })
                :
                <p>{props?.formData[0]?.message}</p>
            }
        </Modal>
    );
};

export default ActionModal;