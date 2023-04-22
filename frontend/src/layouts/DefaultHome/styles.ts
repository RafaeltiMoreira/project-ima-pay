import styled from "styled-components";

export const LayoutHomeContainer = styled.div`
  max-width: 70rem;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors["linear-gray"]};
  border-radius: 6px;
  display: 1;
  flex-direction: column;
`;
