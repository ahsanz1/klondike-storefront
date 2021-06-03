import styled from 'styled-components'

export const ContainerMain = styled.div`
  padding: 80px 0;
  transition: background-color 0.25s ease-in-out;
  background-color: ${props => (props.color ? props.color : '#78b7e8')};

  .cs--page-width {
    max-width: ${props => (props.maxWidth ? props.maxWidth : '1800px')};
    margin: 0 auto;
    padding: 0 60px;
  }

  @media (max-width: 980px) {
    .cs--page-width {
      padding: 0 25px;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 0 35px;
  }
`
