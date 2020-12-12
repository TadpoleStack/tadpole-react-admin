import React from 'react'
import { Table } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import './index.scss'

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

class SortableHocTable extends React.Component {
    state = {
        dataSource: [],
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { dataSource } = this.state;
        if (oldIndex !== newIndex) {
        const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
        this.setState({ dataSource: newData });
        }
    };

    DraggableBodyRow = ({ className, style, ...restProps }) => {
        const { dataSource } = this.state;
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };
    
    getUserList = async () => {
        let res = await React.$api.user.getUserList()
        res.data = res.data.map((value,index)=>{
          value.key = index
          value.index = index
          return value
        })
        this.setState({dataSource:res.data})
    }

    componentDidMount(){
        this.getUserList()
    }

    render() {
        const { dataSource } = this.state;
        const columns = [
            {
                title: '排序',
                dataIndex: 'sort',
                width: 60,
                className: 'drag-visible',
                render: () => <DragHandle />,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                className: 'drag-visible',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
        ];
        const DraggableContainer = props => (
        <SortableContainer
            useDragHandle
            helperClass="row-dragging"
            onSortEnd={this.onSortEnd}
            {...props}
        />
        );
        return (
        <Table
            pagination={false}
            dataSource={dataSource}
            columns={columns}
            rowKey="index"
            components={{
                body: {
                    wrapper: DraggableContainer,
                    row: this.DraggableBodyRow,
                }
            }}
            footer={()=><div>功能：拖拽手柄列</div>}
        />
        );
    }
}

export default SortableHocTable;