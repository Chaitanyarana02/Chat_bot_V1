import styled from "styled-components";

const LoginWrapper = styled.div`
  height: 100vh;
  width: 100%;
  .box-container {
    height: calc(100% - 144px);
    .box-card {
      max-width: 420px;
      color: #1c1c1f;

      .main-title {
        font-size: 26px;
        font-weight: 600;
        line-height: 32px;
        letter-spacing: 0em;
        margin-bottom: 36px;
        span {
          color: #ff3131;
        }
      }
      .forgot-pass {
        font-size: 12px;
        font-weight: 600;
        line-height: 15px;
        margin: 10px 0 48px 0;
        letter-spacing: 0em;
      }
    }
  }
`;

export { LoginWrapper };
