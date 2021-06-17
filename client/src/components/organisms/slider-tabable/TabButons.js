import styled from 'styled-components'

export const TabButton = styled.span`
  display: block;
  flex: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  font-size: 0;
  text-align: center;

  @media (min-width: 768px) {
    width: auto;
    height: auto;
    padding: 8px;
    border-radius: 0;
    background-color: ${props => (props.color ? props.color : 'transparent')};
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }
`

export const LearnMoreButton = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  transition: background-color 0.2s ease-in;
  border: 2px solid;
  background-color: transparent;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.color ? props.color : 'transparent')};
  }

  &:focus {
    outline: 0;
  }
`
