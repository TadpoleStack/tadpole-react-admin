import styled from 'styled-components'

export const TimerWrap = styled.div`
   display:flex;
   overflow:hidden;
   width:${props => props.style.width}px;
   height:${props => props.style.height}px;
   position:${props => props.style.position};
   z-index:${props => props.style.zIndex};
   top:${props => props.style.top}px;
   right:${props => props.style.right}px;
   font-size:${props => props.style.fontSize};
   color:${props => props.style.color};
   .column{
      width:${props => props.cell.width}px;
      transition:all 300ms;
      .cell{
         height:${props => props.cell.width}px;
         display:flex;
         justify-content:center;
         align-items:center;
      }
   }
`