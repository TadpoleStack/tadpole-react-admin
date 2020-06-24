import styled from 'styled-components'

export const SidebarWrap = styled.div`
    width: ${props => props.width};
    position: ${props => (props.device === 'PC' ? 'static' : 'absolute')};
    top: 0;
    left: ${props => (props.sidebarState ? 0 : '-100%')};
    z-index: 100;
    height: 100%;
    overflow-y: auto;
    transition: 300ms;
    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #bbbbbb;
    }
    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: transparent;
    }
`
