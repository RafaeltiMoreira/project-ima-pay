import styled from "styled-components";

export const HeaderLoginContainer = styled.header`
  box-shadow: 0 0.1rem 0.5rem ${({ theme }) => theme.colors.ice};
  padding: 2.5rem 0;
`;

export const HeaderLoginContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  img {
    width: 108px;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 1px solid transparent;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.ice};
    color: ${(props) => props.theme.colors["--theme"]};
    font-weight: 500;
    border-radius: 10px;

    &:hover {
      background: ${({ theme }) => theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors["--theme"]};

      transition: background-color 0.2s border-color 0.2s;
    }
  }

  .btn-power {
    color: ${({ theme }) => theme.colors["ima-900"]};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
