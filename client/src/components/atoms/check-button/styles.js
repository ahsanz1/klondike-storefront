import styled from 'styled-components'

export const Button = styled.div`
  display: inline-block;
  margin: 0 12px;
  padding: 10px 30px;
  border: 2px solid #fff;
  color: #fff;
  font-family: futura-pt, Helvetica, Arial, sans-serif;
  font-size: 20.5px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  cursor: pointer;

  &.button-active {
    background-color: #fff;
    color: ${props => props.hoverColor};
  }

  &:hover {
    background-color: #fff;
    color: ${props => props.hoverColor};
  }

  @media (max-width: 1180px) and (min-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    margin: 0 0;
    margin-right: 30px;
    padding: 10px 9px;
    font-size: 14px;
    line-height: 22px;

    :last-child {
      margin-right: 0;
    }
  }
`
